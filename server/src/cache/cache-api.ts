import { Redis } from "ioredis";
import config from "../config.js";

/**
 * Exposes an API to communicate with a redis instance
 * @param redisClient - a redis client
 **/
export class CacheAPI {
  private redisClient: Redis;
  private prefix: string;

  constructor({ prefix = "redis" }: { prefix?: string } = {}) {
    this.redisClient = new Redis(config.REDIS_URL);
    this.prefix = prefix;
  }

  private nameSpacedKey({ key }: { key: string }) {
    return `${this.prefix}:${key}`;
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
    await this.redisClient.hset(
      this.nameSpacedKey({ key }),
      field,
      JSON.stringify(value),
    );
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
    const pipeline = this.redisClient.pipeline();

    valueArray.forEach((value, i) => {
      pipeline.hset(
        this.nameSpacedKey({ key }),
        String(i),
        JSON.stringify(value),
      );
    });

    pipeline.expire(this.nameSpacedKey({ key }), ttlSeconds);

    await pipeline.exec();
  }

  async hGet<T>({
    key,
    field,
  }: {
    key: string;
    field: string;
  }): Promise<T | null> {
    const rawValue = await this.redisClient.hget(
      this.nameSpacedKey({ key }),
      field,
    );

    // so ts stops crying
    if (typeof rawValue !== "string") {
      return null;
    }

    const value = rawValue
      ? (JSON.parse(rawValue, this.dateReviver) as T)
      : null;

    return value;
  }

  async getAll<T>({ key }: { key: string }): Promise<T[] | null> {
    const rawData = await this.redisClient.hgetall(this.nameSpacedKey({ key }));

    if (!rawData || Object.keys(rawData).length === 0) {
      return null;
    }

    const values = Object.entries(rawData)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([, value]) => JSON.parse(value, this.dateReviver) as T);

    return values;
  }

  async del({ key }: { key: string }) {
    await this.redisClient.del(this.nameSpacedKey({ key }));
  }

  async delByPattern({ pattern }: { pattern: string }) {
    if (!this.redisClient) return;
    const stream = this.redisClient.scanStream({
      match: `${this.prefix}:${pattern}`,
    });
    const keys: string[] = [];

    for await (const resultKeys of stream) {
      keys.push(...resultKeys);
    }

    if (keys.length > 0) {
      await this.redisClient.del(keys);
    }
  }

  async expire({ key, ttl }: { key: string; ttl: number }) {
    await this.redisClient.expire(this.nameSpacedKey({ key }), ttl);
  }

  async sAdd({ setKey, cacheKey }: { setKey: string; cacheKey: string }) {
    await this.redisClient.sadd(
      this.nameSpacedKey({ key: setKey }),
      this.nameSpacedKey({ key: cacheKey }),
    );
  }

  async sMembers({ setKey }: { setKey: string }) {
    return await this.redisClient.smembers(this.nameSpacedKey({ key: setKey }));
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
    await this.redisClient.set(
      this.nameSpacedKey({ key }),
      JSON.stringify(value),
      "EX",
      ttlSeconds,
    );
  }

  async get<T>({ key }: { key: string }): Promise<T | null> {
    const rawValue = await this.redisClient.get(this.nameSpacedKey({ key }));
    if (typeof rawValue !== "string") return null;
    const value = JSON.parse(rawValue, this.dateReviver);
    return value;
  }

  pipeline() {
    return this.redisClient.pipeline();
  }

  private dateReviver(key: string, value: any) {
    // detect ISO date strings and turn them into Date
    if (
      typeof value === "string" &&
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)
    ) {
      return new Date(value);
    }
    return value;
  }

  async removeRelations({
    id,
    name,
  }: {
    id: string;
    name:
      | "author"
      | "poem"
      | "comment"
      | "collection"
      | "like"
      | "savedPoem"
      | "followedAuthor";
  }) {
    const keys = await this.sMembers({
      setKey: `${name}:${id}:queries`,
    });

    const pipeline = this.pipeline();

    if (keys.length > 0) {
      for (const key of keys) pipeline.del(key);
      await pipeline.exec();
    }

    pipeline.del(this.nameSpacedKey({ key: `${name}:id:${id}` }));

    pipeline.del(this.nameSpacedKey({ key: `${name}:${id}:queries` }));

    await pipeline.exec();
  }
}
