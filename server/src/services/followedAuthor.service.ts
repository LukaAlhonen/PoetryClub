import { PrismaClient, Prisma } from "../../generated/prisma/index.js";
import { CacheAPI } from "../cache/cache-api.js";
import { FollowedAuthorWithRelations } from "../types/extended-types.js";
import { validateInputStrings } from "../utils/validate-input-strings.js";

export class FollowedAuthorService {
  private prisma: PrismaClient;
  private cache: CacheAPI;

  constructor({ prisma, cache }: { prisma: PrismaClient; cache: CacheAPI }) {
    this.prisma = prisma;
    this.cache = cache;
  }

  /**
   * Returns a FollowedAuthor object matching the given id
   * @param id - FollowedAuthor id
   **/
  async getFollowedAuthor({
    id,
  }: {
    id: string;
  }): Promise<FollowedAuthorWithRelations | null> {
    const cacheKey = `followedAuthor:id:${id}`;
    const cached = await this.cache.get<FollowedAuthorWithRelations>({
      key: cacheKey,
    });
    if (cached) return cached;

    const followedAuthor = await this.prisma.followedAuthor.findUnique({
      where: { id },
      include: {
        follower: true,
        following: true,
      },
    });

    if (followedAuthor) {
      await this.cache.set({ key: cacheKey, value: followedAuthor });
      await this.cache.sAdd({
        setKey: `followedAuthor:${followedAuthor.id}:queries`,
        cacheKey,
      });
    }

    return followedAuthor;
  }

  /**
   * Returns an array of FollowedAuthor objects, optionally filter by follower or following
   * @param followerId - follower to filter by
   * @param followingId - following to filter by
   **/
  async getFollowedAuthors({
    followerId,
    followingId,
    limit,
    cursor,
  }: {
    followerId?: string;
    followingId?: string;
    limit?: number;
    cursor?: string;
  } = {}): Promise<FollowedAuthorWithRelations[] | null> {
    const cacheKey = `followedAuthors:limit:${limit ? limit : "null"}:cursor:${cursor ? cursor : "null"}:followerId:${followerId ? followerId : "null"}:followingId:${followingId ? followingId : "null"}`;
    const cached = await this.cache.getAll<FollowedAuthorWithRelations>({
      key: cacheKey,
    });
    if (cached) return cached;

    const queryFilter: Prisma.FollowedAuthorWhereInput = {
      ...(followerId ? { followerId } : {}),
      ...(followingId ? { followingId } : {}),
    };

    const queryOptions: Prisma.FollowedAuthorFindManyArgs = {
      where: queryFilter,
      include: {
        follower: true,
        following: true,
      },
      orderBy: [{ dateFollowed: "desc" }, { id: "desc" }],
    };

    if (limit) {
      queryOptions.take = limit;
    }
    if (cursor) {
      queryOptions.cursor = {
        id: cursor,
      };
      queryOptions.skip = 1;
    }

    const followedAuthors = (await this.prisma.followedAuthor.findMany(
      queryOptions,
    )) as FollowedAuthorWithRelations[];

    if (followedAuthors) {
      for (const followedAuthor of followedAuthors) {
        await this.cache.sAdd({
          setKey: `followedAuthor:${followedAuthor.id}:queries`,
          cacheKey,
        });
      }
    }

    return followedAuthors;
  }

  /**
   * Creates FollowedAuthor
   * @param authorId - Author
   * @param followingId - Author to follow
   * @returns created FollowedAuthor object
   **/
  async createFollowedAuthor({
    authorId,
    followingId,
  }: {
    authorId: string;
    followingId: string;
  }) {
    validateInputStrings({ input: { authorId, followingId } });
    // author cannot follow themself
    if (authorId === followingId) {
      throw new Error("An author cannot follow themself");
    }
    const followedAuthor = await this.prisma.followedAuthor.create({
      data: {
        followerId: authorId,
        followingId,
      },
      include: {
        follower: true,
        following: true,
      },
    });

    if (followedAuthor) {
      await this.cache.delByPattern({ pattern: "followedAuthor:limit:*" });
      await this.cache.removeRelations({
        id: followedAuthor.followerId,
        name: "author",
      });
      await this.cache.removeRelations({
        id: followedAuthor.followingId,
        name: "author",
      });
    }

    return followedAuthor;
  }

  /**
   * Removes FollowedAuthor
   * @param id - followedAuthor to remove
   * @returns removed FollowedAuthor object
   **/
  async removeFollowedAuthor({ id }: { id: string }) {
    const followedAuthor = await this.prisma.followedAuthor.delete({
      where: {
        id,
      },
    });

    if (followedAuthor) {
      await this.cache.removeRelations({
        id: followedAuthor.id,
        name: "followedAuthor",
      });
      await this.cache.removeRelations({
        id: followedAuthor.followerId,
        name: "author",
      });
      await this.cache.removeRelations({
        id: followedAuthor.followingId,
        name: "author",
      });
    }

    return followedAuthor;
  }
}
