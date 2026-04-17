import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

export async function tokenBucketLimit(key: string, capacity = 30, refillPerMin = 30) {
  const now = Date.now();
  const bucketKey = `rl:${key}`;
  const data = await redis.hgetall(bucketKey);

  let tokens = data.tokens ? Number(data.tokens) : capacity;
  let lastRefill = data.lastRefill ? Number(data.lastRefill) : now;

  const elapsed = (now - lastRefill) / 60000;
  tokens = Math.min(capacity, tokens + elapsed * refillPerMin);

  if (tokens < 1) {
    await redis.hset(bucketKey, { tokens: tokens.toString(), lastRefill: now.toString() });
    await redis.expire(bucketKey, 120);
    return { allowed: false, remaining: 0 };
  }

  tokens -= 1;
  await redis.hset(bucketKey, { tokens: tokens.toString(), lastRefill: now.toString() });
  await redis.expire(bucketKey, 120);

  return { allowed: true, remaining: Math.floor(tokens) };
}
