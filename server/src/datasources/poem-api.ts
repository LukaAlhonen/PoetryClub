import { PrismaClient, Prisma } from "../../generated/prisma/client";
import { KeyValueCache } from "@apollo/utils.keyvaluecache";
import {
  CreatePoemInput,
  CreateUserInput,
  UpdatePoemInput,
  UpdateUserInput,
} from "../types";
import { handlePrismaError } from "../utils/prisma-error-handler";

export class PoemAPI {
  constructor(
    private prisma: PrismaClient,
    private cache: KeyValueCache,
  ) {}

  // Get all poems, optionally filter by author
  // TODO: add more filtering options
  async getPoems(authorId?: string | null) {
    const cacheKey = authorId ? `poems:author:${authorId}` : "poems:all";
    const cached = await this.cache.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    const filter = authorId ? { authorId: authorId } : {};
    const poems = await this.prisma.poem.findMany({
      where: filter,
      include: { author: true },
    });

    await this.cache.set(cacheKey, JSON.stringify(poems), { ttl: 300 }); // Cache for 5 minutes
    return poems;
  }

  // Get poem by id
  async getPoem(id: string) {
    const cacheKey = `poem:${id}`;
    const cached = await this.cache.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    const poem = await this.prisma.poem.findFirst({ where: { id: id } });
    if (poem) {
      await this.cache.set(cacheKey, JSON.stringify(poem), { ttl: 600 }); // Cache for 10 minutes
    }
    return poem;
  }

  // Get user by id
  async getUser(id: string) {
    const cacheKey = `user:${id}`;
    const cached = await this.cache.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    const user = await this.prisma.user.findFirst({ where: { id: id } });
    if (user) {
      await this.cache.set(cacheKey, JSON.stringify(user), { ttl: 900 }); // Cache for 15 minutes
    }
    return user;
  }

  // Get all users
  async getUsers() {
    const cacheKey = "users:all";
    const cached = await this.cache.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    const users = await this.prisma.user.findMany();
    await this.cache.set(cacheKey, JSON.stringify(users), { ttl: 300 });
    return users;
  }

  // Search for user by name
  async getUserByName(username: string) {
    const cacheKey = `users:username:${username}`;
    const cached = await this.cache.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    const user = await this.prisma.user.findFirst({
      where: { username: username },
    });
    if (user) {
      await this.cache.set(cacheKey, JSON.stringify(user), { ttl: 900 });
    }
    return user;
  }

  // Add new poem
  async createPoem(input: CreatePoemInput) {
    try {
      const poem = await this.prisma.poem.create({
        data: input,
        include: { author: true },
      });

      // Invalidate relevant caches
      await this.invalidatePoemCache(undefined, input.authorId);

      return {
        code: 201,
        success: true,
        message: "Successfully added poem",
        data: poem,
      };
    } catch (err) {
      return handlePrismaError(err, "createPoem");
    }
  }

  // Add new user
  async createUser(input: CreateUserInput) {
    try {
      const user = await this.prisma.user.create({
        data: input,
      });

      await this.invalidateUserCache(user.id);

      return {
        code: 201,
        success: true,
        message: "Successfully added user",
        data: user,
      };
    } catch (err) {
      return handlePrismaError(err, "createUser");
    }
  }

  // Edit poem, mainly for testing
  async updatePoem(input: UpdatePoemInput) {
    try {
      const { poemId, title, authorId, text, datePublished } = input;

      // Dynamically construct data object so no null values are written to db
      const data: any = {};
      if (title != null) data.title = title;
      if (authorId != null) data.authorId = authorId;
      if (text != null) data.text = text;
      if (datePublished != null) data.datePublished = datePublished;

      const poem = await this.prisma.poem.update({
        where: {
          id: poemId,
        },
        data: data,
      });

      // Remove old value from cache
      this.invalidatePoemCache(poemId);

      return {
        code: 200,
        success: true,
        message: "Successfully updated poem",
        data: poem,
      };
    } catch (err) {
      return handlePrismaError(err, "editPoem");
    }
  }

  async updateUser(input: UpdateUserInput) {
    try {
      const { userId, username, password, email } = input;

      const data: any = {};
      if (username != null) data.username = username;
      if (password != null) data.password = password;
      if (email != null) data.email = email;

      const user = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: data,
      });

      // Remove old user from cache
      this.invalidateUserCache(userId);

      return {
        code: 200,
        success: true,
        message: "Succesfully updated user",
        data: user,
      };
    } catch (err) {
      return handlePrismaError(err, "updateUser");
    }
  }

  // Cache invalidation methods
  async invalidatePoemCache(poemId?: string, authorId?: string) {
    const keysToDelete = ["poems:home", "poems:all"];

    if (poemId) {
      keysToDelete.push(`poem:${poemId}`);
    }

    if (authorId) {
      keysToDelete.push(`poems:author:${authorId}`);
    }

    await Promise.all(keysToDelete.map((key) => this.cache.delete(key)));
  }

  async invalidateUserCache(userId: string) {
    await this.cache.delete(`user:${userId}`);
    // Also invalidate poems by this author
    await this.cache.delete(`poems:author:${userId}`);
    await this.cache.delete("poems:home");
    await this.cache.delete("poems:all");
  }
}
