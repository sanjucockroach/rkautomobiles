import {
  createSessionCookie,
  credentialsAreConfigured,
  credentialsMatch,
  isSameOrigin,
} from "../../server/auth.js";
import { redisCommand } from "../../server/redis.js";

function clientAddress(request) {
  return String(request.headers["x-forwarded-for"] || request.socket?.remoteAddress || "unknown")
    .split(",")[0]
    .trim();
}
export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }
  if (!isSameOrigin(request)) {
    return response.status(403).json({ error: "Invalid request origin." });
  }
  if (!credentialsAreConfigured()) {
    return response.status(503).json({
      error: "Vercel Production is missing ADMIN_USERNAME, ADMIN_PASSWORD, or ADMIN_SESSION_SECRET. Add all three environment variables and redeploy.",
    });
  }

  try {
    const attemptKey = `rk:login:${clientAddress(request)}`;
    const attempts = Number(await redisCommand("INCR", attemptKey));
    if (attempts === 1) await redisCommand("EXPIRE", attemptKey, 900);
    if (attempts > 8) {
      return response.status(429).json({ error: "Too many attempts. Try again in 15 minutes." });
    }

    const username = String(request.body?.username || "").trim();
    const password = String(request.body?.password || "");
    if (!credentialsMatch(username, password)) {
      return response.status(401).json({ error: "Incorrect username or password." });
    }

    await redisCommand("DEL", attemptKey);
    response.setHeader("Set-Cookie", createSessionCookie(username));
    return response.status(200).json({ username });
  } catch (error) {
    return response.status(503).json({
      error: error instanceof Error ? error.message : "Login service is unavailable.",
    });
  }
}
