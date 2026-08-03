import { requireSession, isSameOrigin } from "../server/auth.js";
import { redisCommand } from "../server/redis.js";

const INVENTORY_KEY = "rk:inventory:v1";
const MAX_CARS = 500;
const MAX_PAYLOAD_BYTES = 3_500_000;

function isCar(car) {
  return (
    car &&
    typeof car === "object" &&
    typeof car.id === "string" &&
    typeof car.name === "string" &&
    typeof car.brand === "string" &&
    typeof car.model === "string" &&
    typeof car.year === "number" &&
    typeof car.price === "number" &&
    typeof car.image === "string" &&
    Array.isArray(car.features) &&
    (car.images === undefined ||
      (Array.isArray(car.images) &&
        car.images.length <= 5 &&
        car.images.every((image) => typeof image === "string")))
  );
}
export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");

  try {
    if (request.method === "GET") {
      const saved = await redisCommand("GET", INVENTORY_KEY);
      if (!saved) return response.status(204).end();
      const cars = JSON.parse(saved);
      if (!Array.isArray(cars) || !cars.every(isCar)) {
        return response.status(500).json({ error: "Stored inventory is invalid." });
      }
      return response.status(200).json({ cars });
    }

    if (request.method === "PUT") {
      if (!isSameOrigin(request)) {
        return response.status(403).json({ error: "Invalid request origin." });
      }
      if (!requireSession(request, response)) return;

      const cars = request.body?.cars;
      if (!Array.isArray(cars) || cars.length > MAX_CARS || !cars.every(isCar)) {
        return response.status(400).json({ error: "Inventory data is invalid." });
      }
      const serialized = JSON.stringify(cars);
      if (Buffer.byteLength(serialized, "utf8") > MAX_PAYLOAD_BYTES) {
        return response.status(413).json({ error: "Inventory is too large. Store photos in Vercel Blob." });
      }

      await redisCommand("SET", INVENTORY_KEY, serialized);
      return response.status(200).json({ cars });
    }

    response.setHeader("Allow", "GET, PUT");
    return response.status(405).json({ error: "Method not allowed." });
  } catch (error) {
    return response.status(503).json({
      error: error instanceof Error ? error.message : "Inventory service is unavailable.",
    });
  }
}
