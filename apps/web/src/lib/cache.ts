import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

export async function cacheGet<T>(key: string): Promise<T | null> {
  const value = await redis.get(key);
  return value ? (JSON.parse(value) as T) : null;
}

export async function cacheSet(key: string, value: unknown, ttlSec = 60) {
  await redis.set(key, JSON.stringify(value), "EX", ttlSec);
}

export async function cacheInvalidate(key: string) {
  await redis.del(key);
}
