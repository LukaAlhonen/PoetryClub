import { PrismaClient, Prisma } from "../../generated/prisma/index.js";
import { CacheAPI } from "../cache/cache-api.js";
import { SafeAuthor } from "../types/extended-types.js";
import { validateInputStrings } from "../utils/validate-input-strings.js";
import argon2 from "argon2";

export class AuthorService {
  private prisma: PrismaClient;
  private cache: CacheAPI;

  constructor({ prisma, cache }: { prisma: PrismaClient; cache: CacheAPI }) {
    this.prisma = prisma;
    this.cache = cache;
  }

  /**
   * Returns an Author object matching the provided id
   * @param id - Author id
   * @param omitPassword - include password with returned author, omitted by default
   * @param omitAuthVersion - include authVersion with returned author, omitted by default
   *
   * @example
   * const author = await poemAPI.getAuthor({id: authorId})
   * console.log(author.password) // undefined
   **/
  async getAuthorById({
    id,
    omitPassword = true,
    omitAuthVersion = true,
  }: {
    id: string;
    omitPassword?: boolean;
    omitAuthVersion?: boolean;
  }): Promise<SafeAuthor> {
    const cacheKey = `author:id:${id}:omitPassword:${omitPassword}:omitAuthVersion:${omitAuthVersion}`;

    const cached = await this.cache.get<SafeAuthor>({ key: cacheKey });
    if (cached) {
      return cached;
    }

    const author = await this.prisma.author.findUniqueOrThrow({
      where: { id: id },
      include: {
        poems: true,
        savedPoems: true,
        likedPoems: true,
        collections: true,
        comments: true,
        followedBy: true,
        following: true,
      },
    });

    // remove passsword and authVersion
    const copy = { ...author };
    if (omitPassword) delete copy.password;
    if (omitAuthVersion) delete copy.authVersion;

    // cache author
    if (author) {
      await this.cache.set({ key: cacheKey, value: copy });
      await this.cache.sAdd({ setKey: `author:${id}:queries`, cacheKey });
    }

    return copy;
  }

  /**
   * Returns an Author object matching the provided username
   * @param username - Author username
   * @param omitPassword - include password with returned Author, omitted by default
   * @param omitAuthVersion - include authVersion with returned Author, omitted by default
   *
   * @example
   * const author = await poemAPI.getAuthor({username: "JohnDoe"})
   * console.log(author.password) // undefined
   * console.log(author.username) // "JohnDoe"
   **/
  async getAuthorByUsername({
    username,
    omitPassword = true,
    omitAuthVersion = true,
  }: {
    username: string;
    omitPassword?: boolean;
    omitAuthVersion?: boolean;
  }): Promise<SafeAuthor> {
    const cacheKey = `author:username:${username}:omitPassword:${omitPassword}:omitAuthVersion:${omitAuthVersion}`;
    const cached = await this.cache.get<SafeAuthor>({ key: cacheKey });
    if (cached) {
      return cached;
    }

    const author = await this.prisma.author.findUniqueOrThrow({
      where: { username: username },
      include: {
        poems: true,
        savedPoems: true,
        likedPoems: true,
        collections: true,
        comments: true,
        followedBy: true,
        following: true,
      },
    });

    // remove password and authversion
    const copy = { ...author };
    if (omitPassword) delete copy.password;
    if (omitAuthVersion) delete copy.authVersion;

    // cache author
    if (author) {
      await this.cache.set({ key: cacheKey, value: copy });
      await this.cache.sAdd({
        setKey: `author:${author.id}:queries`,
        cacheKey,
      });
    }

    return copy;
  }

  /**
   * Returns an array of Author objects, optionally filter by usernameContains
   * @param omitPassword - include password with returned author, omitted by default
   * @param omitAuthVersion - include authVersion with returned author, omitted by default
   * @param usernameContains
   * @param first
   * @param after
   * @returns array of Author objects
   *
   * @example
   * const authors = await poemAPI.getAuthors()
   * console.log(authors.length) // 20
   **/
  async getAuthors({
    omitPassword = true,
    omitAuthVersion = true,
    usernameContains,
    first,
    after,
  }: {
    omitPassword?: boolean;
    omitAuthVersion?: boolean;
    usernameContains?: string;
    first?: number;
    after?: string;
  } = {}): Promise<SafeAuthor[] | null> {
    const cacheKey = `authors:omitPassword:${omitPassword}:omitAuthVersion:${omitAuthVersion}:first:${first ? first : "null"}:after:${after ? after : "null"}:usernameContains:${usernameContains ? usernameContains : "null"}`;
    const cached = await this.cache.getAll<SafeAuthor>({
      key: cacheKey,
    });
    // return cached authors
    if (cached) {
      return cached;
    }

    const queryFilter: Prisma.AuthorWhereInput = {
      ...(usernameContains
        ? { username: { contains: usernameContains, mode: "insensitive" } }
        : {}),
    };

    const queryOptions: Prisma.AuthorFindManyArgs = {
      where: queryFilter,
      include: {
        poems: true,
        savedPoems: true,
        likedPoems: true,
        collections: true,
        comments: true,
        followedBy: true,
        following: true,
      },
      orderBy: [{ dateJoined: "desc" }, { id: "desc" }],
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

    const authors = (await this.prisma.author.findMany(
      queryOptions,
    )) as SafeAuthor[];

    // remove password and authVersion from each author based on
    // omitPassword and omitAuthVersion params
    const safeAuthors = authors.map((author) => {
      const copy = { ...author };
      if (omitPassword) delete copy.password;
      if (omitAuthVersion) delete copy.authVersion;
      return copy;
    });

    if (authors) {
      await this.cache.hSetArray({ key: cacheKey, valueArray: safeAuthors });
      for (const author of safeAuthors) {
        await this.cache.sAdd({
          setKey: `author:${author.id}:queries`,
          cacheKey,
        });
      }
    }

    return safeAuthors;
  }

  /**
   * Checks if the previous page exists
   * @param before - id of first author in page
   * @param usernameContains - filter used in query
   * @returns true if the previous page exists, false if not
   **/
  async hasPreviousPage({before, usernameContains}: {before: string, usernameContains?: string}) {
    const firstAuthor = await this.prisma.author.findUnique({ where: { id: before } });
    if (!firstAuthor) return false;

    const queryFilter: Prisma.AuthorWhereInput = {
      ...(usernameContains
        ? { username: { contains: usernameContains, mode: "insensitive" } }
        : {}),
    };
    const hasPrev = await this.prisma.author.findFirst({
      where: {
        ...queryFilter,
        OR: [
          { dateJoined: { gt: firstAuthor.dateJoined } },
          {
            dateJoined: firstAuthor.dateJoined,
            id: { gt: firstAuthor.id }
          }
        ]
      },
      orderBy: [{ dateJoined: "asc" }, { id: "asc" }],
      select: { id: true }
    });
    return Boolean(hasPrev)
  }

  /**
   * Get a page of authors using relay-style pagination
   * @param first
   * @param after
   * @param usernameContains
  **/
  async getAuthorsConnection({ first, after, usernameContains }: { first?: number, after?: string, usernameContains?: string } = {}) {
    const authors = await this.getAuthors({ first: first ? first + 1 : undefined, after, usernameContains });

    const hasNextPage = authors.length > (first ?? authors.length);
    const edges = hasNextPage ? authors.slice(0, first) : authors;

    const startCursor = edges.length > 0 ? edges[0].id : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].id : null;

    let hasPreviousPage = false;
    if (edges.length > 0) {
      hasPreviousPage = await this.hasPreviousPage({ before: edges[0].id, usernameContains });
    }

    return {
      edges: edges.map((author) => ({
        node: author,
        cursor: author.id
      })),
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
        pageSize: edges.length
      }
    }
  }

  /**
   * Returns the number of FollowedAuthor objects for following or follower
   **/
  async getFollowedAuthorsCount({
    followerId,
    followingId,
  }: {
    followerId?: string;
    followingId?: string;
  }) {
    const cacheKey = `followedAuthorsCount:followerId:${followerId ? followerId : "null"}:followingId:${followingId ? followingId : "null"}`;
    const cached = await this.cache.get<number>({ key: cacheKey });
    if (cached) return cached;

    const queryFilter: Prisma.FollowedAuthorWhereInput = {
      ...(followerId ? { followerId } : {}),
      ...(followingId ? { followingId } : {}),
    };

    const count = await this.prisma.followedAuthor.count({
      where: queryFilter,
    });

    await this.cache.set({ key: cacheKey, value: count });
    if (followerId)
      await this.cache.sAdd({
        setKey: `author:${followerId}:queries`,
        cacheKey,
      });
    if (followingId)
      await this.cache.sAdd({
        setKey: `author:${followingId}:queries`,
        cacheKey,
      });

    return count;
  }

  /**
   * Creates a new Author object with the provided input
   * @param username - author username
   * @param email - author email
   * @param password - author password
   * @param omitPassword - omit password from returned Author
   * @param omitAuthVersion - omit authVersion from returned Author
   * @returns created Author object
   **/
  async createAuthor({
    username,
    email,
    password,
    omitPassword = true,
    omitAuthVersion = true,
  }: {
    username: string;
    email: string;
    password: string;
    omitPassword?: boolean;
    omitAuthVersion?: boolean;
  }): Promise<SafeAuthor> {
    // make sure no strings are empty before hashing password
    validateInputStrings({ input: { username, email, password } });

    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2id,
    });

    const data = {
      username,
      email,
      password: hashedPassword,
    };
    const author = await this.prisma.author.create({
      data,
      include: {
        poems: true,
        savedPoems: true,
        likedPoems: true,
        collections: true,
        comments: true,
        followedBy: true,
        following: true,
      },
    });

    const copy = { ...author };
    if (omitPassword) delete copy.password;
    if (omitAuthVersion) delete copy.authVersion;

    if (author) {
      // nuke all batch author queries
      await this.cache.delByPattern({ pattern: "author:first:*" });

      // cache new author
      const cacheKey = `author:id:${author.id}:omitPassword:${omitPassword}:omitAuthVersion:${omitAuthVersion}`;
      await this.cache.set({ key: cacheKey, value: copy });
      await this.cache.sAdd({
        setKey: `author:${author.id}:queries`,
        cacheKey,
      });
    }

    return copy;
  }

  /**
   * Updates Author with provided input
   * @param authorId - author to update
   * @param username - author username
   * @param password - author password
   * @param email - author email
   * @param omitPassword - omit password from returned author
   * @param omitAuthVersion - omit authVersion from returned author
   * @param authVersion - author authVersion
   **/
  async updateAuthor({
    authorId,
    username,
    password,
    email,
    omitPassword = true,
    omitAuthVersion = true,
    authVersion,
  }: {
    authorId: string;
    username?: string;
    password?: string;
    email?: string;
    omitPassword?: boolean;
    omitAuthVersion?: boolean;
    authVersion?: string;
  }) {
    const data = {
      ...(username ? { username } : {}),
      ...(password ? { password } : {}),
      ...(email ? { email } : {}),
      ...(authVersion ? { authVersion } : {}),
    };

    validateInputStrings({ input: data });

    if (password) {
      const hashedPassword = await argon2.hash(data.password, {
        type: argon2.argon2id,
      });
      data.password = hashedPassword;
    }

    const author = await this.prisma.author.update({
      where: {
        id: authorId,
      },
      data,
      omit: { password: omitPassword, authVersion: omitAuthVersion },
      include: {
        poems: true,
        likedPoems: true,
        following: true,
        followedBy: true,
        collections: true,
        savedPoems: true,
        comments: true,
      },
    });

    // delete ALL cached queries that include the author
    if (author) {
      const cacheKey = `author:id:${author.id}:omitPassword:${omitPassword}:omitAuthVersion:${omitAuthVersion}`;
      const usernameCacheKey = `author:username:${username}:omitPassword:${omitPassword}:omitAuthVersion:${omitAuthVersion}`

      await this.cache.removeRelations({ id: author.id, name: "author" });
      await this.cache.set({ key: cacheKey, value: author });
      await this.cache.sAdd({
        setKey: `author:${author.id}:queries`,
        cacheKey,
      });
      await this.cache.sAdd({
        setKey: `author:${author.id}:queries`,
        cacheKey: usernameCacheKey,
      })
      await this.cache.delByPattern({ pattern: "authors:first:*" });

      for (const poem of author.poems) {
        await this.cache.removeRelations({ id: poem.id, name: "poem" });
      }
      for (const likedPoem of author.likedPoems) {
        await this.cache.removeRelations({ id: likedPoem.id, name: "like" });
      }
      for (const comment of author.comments) {
        await this.cache.removeRelations({ id: comment.id, name: "comment" });
      }
      for (const followedAuthor of author.following) {
        await this.cache.removeRelations({
          id: followedAuthor.id,
          name: "followedAuthor",
        });
      }
      for (const followedAuthor of author.followedBy) {
        await this.cache.removeRelations({
          id: followedAuthor.id,
          name: "followedAuthor",
        });
      }
      for (const collection of author.collections) {
        await this.cache.removeRelations({
          id: collection.id,
          name: "collection",
        });
      }
      for (const savedPoem of author.savedPoems) {
        await this.cache.removeRelations({
          id: savedPoem.id,
          name: "savedPoem",
        });
      }
    }

    return author;
  }

  /**
   * Remove Author
   * @param id - author to remove
   * @returns removed Author object
   **/
  async removeAuthor({ id }: { id: string }) {
    const author = await this.prisma.author.delete({
      where: {
        id,
      },
      include: {
        poems: true,
        savedPoems: true,
        likedPoems: true,
        collections: true,
        comments: true,
        followedBy: true,
        following: true,
      },
      omit: { password: true },
    });

    // nuke all cached queries that contain the author
    if (author) {
      await this.cache.removeRelations({ id: author.id, name: "author" });
      for (const poem of author.poems) {
        await this.cache.removeRelations({ id: poem.id, name: "poem" });
      }
      for (const collection of author.collections) {
        await this.cache.removeRelations({
          id: collection.id,
          name: "collection",
        });
      }
      for (const savedPoem of author.savedPoems) {
        await this.cache.removeRelations({
          id: savedPoem.id,
          name: "savedPoem",
        });
      }
      for (const likedPoem of author.likedPoems) {
        await this.cache.removeRelations({ id: likedPoem.id, name: "like" });
      }
      for (const comment of author.comments) {
        await this.cache.removeRelations({ id: comment.id, name: "comment" });
      }
      for (const followedAuthor of author.followedBy) {
        await this.cache.removeRelations({
          id: followedAuthor.id,
          name: "followedAuthor",
        });
      }
      for (const followedAuthor of author.following) {
        await this.cache.removeRelations({
          id: followedAuthor.id,
          name: "followedAuthor",
        });
      }
    }

    return author;
  }
}
