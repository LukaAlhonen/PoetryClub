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
    first,
    after,
  }: {
    followerId?: string;
    followingId?: string;
    first?: number;
    after?: string;
  } = {}): Promise<FollowedAuthorWithRelations[] | null> {
    const cacheKey = `followedAuthors:first:${first ? first : "null"}:after:${after ? after : "null"}:followerId:${followerId ? followerId : "null"}:followingId:${followingId ? followingId : "null"}`;
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

    if (first) {
      queryOptions.take = first;
    }
    if (after) {
      queryOptions.cursor = {
        id: after,
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

  async hasPreviousPage({before, followerId, followingId }: {before: string, followerId?: string, followingId?: string }) {
    const firstFollowedAuthor = await this.prisma.followedAuthor.findUnique({ where: { id: before } });
    if (!firstFollowedAuthor) return false;

    const queryFilter: Prisma.FollowedAuthorWhereInput = {
      ...(followerId ? { followerId } : {}),
      ...(followingId ? { followingId } : {}),
    };
    const hasPrev = await this.prisma.followedAuthor.findFirst({
      where: {
        ...queryFilter,
        OR: [
          { dateFollowed: { gt: firstFollowedAuthor.dateFollowed}},
          {
            dateFollowed: firstFollowedAuthor.dateFollowed,
            id: { gt: firstFollowedAuthor.id}
          }
        ]
      },
      orderBy: [{dateFollowed: "asc"}, {id: "asc"}],
      select: {id: true}
    })

    return Boolean(hasPrev);
  }

  async getFollowedAuthorsConnection({ first, after, followerId, followingId }: { first?: number, after?: string, followerId?: string, followingId?: string } = {}){
    const followedAuthors = await this.getFollowedAuthors({ first: first ? first + 1 : undefined, after, followerId, followingId });

    const hasNextPage = followedAuthors.length > (first ?? followedAuthors.length);
    const edges = hasNextPage ? followedAuthors.slice(0, first) : followedAuthors;

    const startCursor = edges.length > 0 ? edges[0].id : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].id : null;

    let hasPreviousPage = false;
    if (edges.length > 0) {
      hasPreviousPage = await this.hasPreviousPage({ before: edges[0].id, followerId, followingId });
    }

    return {
      edges: edges.map((followedAuthor) => ({
        node: followedAuthor,
        cursor: followedAuthor.id
      })),
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
        pageSize: edges.length,
      }
    }
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
      await this.cache.delByPattern({ pattern: "followedAuthor:first:*" });
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
