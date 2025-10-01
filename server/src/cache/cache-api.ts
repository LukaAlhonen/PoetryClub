import { Redis } from "ioredis";
import config from "../config.js";

/**
 * Exposes an API to communicate with a redis instance
 * @param redisClient - a redis client
 **/
export class CacheAPI {
  private redisClient: Redis;
  constructor() {
    this.redisClient = new Redis(config.REDIS_URL);
  }

  // standard redis caching operations
  async hSet({
    key,
    field,
    value,
  }: {
    key: string;
    field: string;
    value: unknown;
  }) {
    await this.redisClient.hset(key, field, JSON.stringify(value));
  }

  async hSetArray({
    key,
    valueArray,
    ttlSeconds = 60,
  }: {
    key: string;
    valueArray: Array<unknown>;
    ttlSeconds?: number;
  }) {
    // for (let i = 0; i < valueArray.length; ++i) {
    //   await this.hSet({ key, field: String(i), value: valueArray[i] });
    // }
    const pipeline = this.redisClient.pipeline();

    valueArray.forEach((value, i) => {
      pipeline.hset(key, String(i), JSON.stringify(value));
    });

    pipeline.expire(key, ttlSeconds);

    await pipeline.exec();
  }

  async hGet<T>({
    key,
    field,
  }: {
    key: string;
    field: string;
  }): Promise<T | null> {
    const rawValue = await this.redisClient.hget(key, field);

    // so ts stops crying
    if (typeof rawValue !== "string") {
      return null;
    }

    const value = rawValue ? (JSON.parse(rawValue) as T) : null;

    return value;
  }

  async getAll<T>({ key }: { key: string }): Promise<T[] | null> {
    const rawData = await this.redisClient.hgetall(key);

    if (!rawData || Object.keys(rawData).length === 0) {
      return null;
    }

    // Parse each value
    const data = Object.fromEntries(
      Object.entries(rawData).map(([key, value]) => [key, JSON.parse(value)]),
    ) as T;

    return Object.values(data);
  }

  async del({ key }: { key: string }) {
    await this.redisClient.del(key);
  }

  async delByPattern({ pattern }: { pattern: string }) {
    if (!this.redisClient) return;
    const stream = this.redisClient.scanStream({ match: pattern });
    const keys: string[] = [];

    for await (const resultKeys of stream) {
      keys.push(...resultKeys);
    }

    if (keys.length > 0) {
      await this.redisClient.del(keys);
    }
  }

  async expire({ key, ttl }: { key: string; ttl: number }) {
    await this.redisClient.expire(key, ttl);
  }

  async sAdd({ setKey, cacheKey }: { setKey: string; cacheKey: string }) {
    await this.redisClient.sadd(setKey, cacheKey);
  }

  async sMembers({ setKey }: { setKey: string }) {
    return await this.redisClient.smembers(setKey);
  }

  async set({
    key,
    value,
    ttlSeconds = 60,
  }: {
    key: string;
    value: unknown;
    ttlSeconds?: number;
  }) {
    await this.redisClient.set(key, JSON.stringify(value), "EX", ttlSeconds);
  }

  async get<T>({ key }: { key: string }): Promise<T | null> {
    const rawValue = await this.redisClient.get(key);
    if (typeof rawValue !== "string") return null;
    const value = JSON.parse(rawValue);
    return value;
  }

  pipeline() {
    return this.redisClient.pipeline();
  }
}
