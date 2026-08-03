const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 12;
const requests = new Map();

function isAllowed(ip) {
  const now = Date.now();
  const recent = (requests.get(ip) || []).filter((time) => now - time < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) return false;
  recent.push(now);
  requests.set(ip, recent);
  return true;
}

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const ip = String(request.headers["x-forwarded-for"] || "unknown").split(",")[0];
  if (!isAllowed(ip)) return response.status(429).json({ error: "Too many attempts. Please try again shortly." });

  const registrationNumber = String(request.body?.registrationNumber || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!/^[A-Z]{2}[0-9A-Z]{5,9}$/.test(registrationNumber)) {
    return response.status(400).json({ error: "Enter a valid Indian vehicle registration number." });
  }

  const providerUrl = process.env.VEHICLE_LOOKUP_API_URL;
  const providerKey = process.env.VEHICLE_LOOKUP_API_KEY;
  if (!providerUrl || !providerKey) {
    return response.status(503).json({ error: "Verified vehicle lookup is being connected. Please use manual valuation for now." });
  }

  try {
    const providerResponse = await fetch(providerUrl, {
      method: "POST",
      headers: { Authorization: `Bearer ${providerKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ registrationNumber }),
    });
    const payload = await providerResponse.json();
    if (!providerResponse.ok) return response.status(502).json({ error: "The vehicle data provider could not complete this lookup." });

    const source = payload.vehicle || payload.data || payload;
    return response.status(200).json({
      vehicle: {
        registrationNumber,
        make: source.make || source.manufacturer,
        model: source.model || source.modelName,
        fuel: source.fuel || source.fuelType,
        registrationDate: source.registrationDate || source.registeredAt,
      },
    });
  } catch {
    return response.status(502).json({ error: "The vehicle data provider is temporarily unavailable." });
  }
}

