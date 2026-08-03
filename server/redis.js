const redisUrl =
  process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const redisToken =
  process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

export function hasRedisConfig() {
  return Boolean(redisUrl && redisToken);
}
export async function redisCommand(...command) {
  if (!hasRedisConfig()) {
    throw new Error("Shared inventory storage is not configured.");
  }

  const response = await fetch(redisUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${redisToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });
  const payload = await response.json();

  if (!response.ok || payload.error) {
    throw new Error(payload.error || "Inventory storage request failed.");
  }

  return payload.result;
}
