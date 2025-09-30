import { PrismaClient, Prisma, Author } from "../../generated/prisma/client.js";
import {
  GetPoemsFilter,
  UpdateCollectionInput,
  UpdatePoemInput,
  GetCollectionsFilter,
} from "../__generated__/types.js";
import { SafeAuthor } from "../types/extended-types.js";
import argon2 from "argon2";

/**
 * Represents a set of defined functions to interract with the prisma client
 **/
export class PoemAPI {
  /**
   * Create a new PoemAPI instance
   * @param prisma - the prisma client to use
   **/
  constructor(private prisma: PrismaClient) {}

  /**
   * Ensures no strings are empty
   * @param input - an object possibly containing strings
   **/
  private validateInputStrings(input: Object) {
    Object.entries(input).forEach((entry) => {
      if (entry[1] instanceof String || typeof entry[1] === "string") {
        if (entry[1].trim() === "") {
          throw new Error(`${entry[0]} cannot be an empty string`);
        }
      }
    });
  }

  /**
   * returns all poems,
   * optionally filter by authorId, authorNameContains, collectionId, textContains, titleContains
   *
   * @param cursor
   * @param limit
   * @param filter
   * @returns All poems that match filter
   *
   * @example
   * ```ts
   * const poems = await poemAPI.getPoems({limit: 10, filter: {authorNameContains: "edgar"}})
   * console.log(poems.length) // 10
   * ```
   **/
  async getPoems({
    cursor,
    limit,
    filter,
  }: {
    cursor?: string;
    limit?: number;
    filter?: GetPoemsFilter | null;
  } = {}) {
    // Add fields from filter to queryfilter if they are present
    const queryFilter: Prisma.PoemWhereInput = filter
      ? {
          ...(filter.authorId ? { authorId: filter.authorId } : {}),
          ...(filter.collectionId ? { collectionId: filter.collectionId } : {}),
          ...(filter.textContains
            ? { text: { contains: filter.textContains, mode: "insensitive" } }
            : {}),
          ...(filter.titleContains
            ? { title: { contains: filter.titleContains, mode: "insensitive" } }
            : {}),
          ...(filter.authorNameContains
            ? {
                author: {
                  username: {
                    contains: filter.authorNameContains,
                    mode: "insensitive",
                  },
                },
              }
            : {}),
        }
      : {};

    const queryOptions: Prisma.PoemFindManyArgs = {
      where: queryFilter,
      include: {
        author: true,
        likes: true,
        savedBy: true,
        comments: true,
        inCollection: true,
      },
      orderBy: [{ datePublished: "desc" }, { id: "desc" }],
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

    const poems = await this.prisma.poem.findMany(queryOptions);

    return poems;
  }

  /**
   *
   **/
  async getPoem({ id }: { id: string }) {
    const poem = await this.prisma.poem.findUnique({
      where: { id: id },
      include: {
        author: true,
        inCollection: true,
        savedBy: true,
        likes: true,
        comments: true,
      },
    });
    return poem;
  }

  /**
   *
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
    const author = await this.prisma.author.findUnique({
      // omit: {
      //   password: omitPassword,
      //   authVersion: omitAuthVersion,
      // },
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

    const copy = { ...author };
    if (omitPassword) delete copy.password;
    if (omitAuthVersion) delete copy.authVersion;

    return copy;
  }

  /**
   *
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
    const author = await this.prisma.author.findFirst({
      where: { username: username },
      // omit: { password: omitPassword, authVersion: omitAuthVersion },
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

    return copy;
  }

  /**
   *
   **/
  async getAuthors({
    omitPassword = true,
    omitAuthVersion = true,
    usernameContains,
    limit,
    cursor,
  }: {
    omitPassword?: boolean;
    omitAuthVersion?: boolean;
    usernameContains?: string;
    limit?: number;
    cursor?: string;
  }): Promise<SafeAuthor[]> {
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

    if (limit) {
      queryOptions.take = limit;
    }
    if (cursor) {
      queryOptions.cursor = {
        id: cursor,
      };
      queryOptions.skip = 1;
    }

    const authors = await this.prisma.author.findMany(queryOptions);

    return authors.map((author) => {
      const copy = { ...author };
      if (omitPassword) delete copy.password;
      if (omitAuthVersion) delete copy.authVersion;
      return copy;
    });
  }

  /**
   *
   **/
  async getComment({ id }: { id: string }) {
    const comment = await this.prisma.comment.findFirst({
      where: { id: id },
      include: { author: true, poem: true },
    });
    return comment;
  }

  /**
   *
   **/
  async getComments({
    authorId,
    poemId,
    limit,
    cursor,
  }: {
    authorId?: string;
    poemId?: string;
    limit?: number;
    cursor?: string;
  }) {
    const queryFilter: Prisma.CommentWhereInput = {
      ...(authorId ? { authorId } : {}),
      ...(poemId ? { poemId } : {}),
    };

    const queryOptions: Prisma.CommentFindManyArgs = {
      where: queryFilter,
      include: {
        author: true,
        poem: true,
      },
      orderBy: [{ datePublished: "desc" }, { id: "desc" }],
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

    const comments = await this.prisma.comment.findMany(queryOptions);

    return comments;
  }

  /**
   *
   **/
  async getCommentsCount({ poemId }: { poemId: string }) {
    const count = await this.prisma.comment.count({
      where: {
        poemId,
      },
    });

    return count;
  }

  /**
   *
   **/
  async getCollection({ id }: { id: string }) {
    const collection = await this.prisma.collection.findUnique({
      where: { id: id },
      include: { author: true, poems: true },
    });

    return collection;
  }

  /**
   *
   **/
  async getCollections({
    limit,
    cursor,
    filter,
  }: {
    limit?: number;
    cursor?: string;
    filter?: GetCollectionsFilter;
  }) {
    const queryFilter: Prisma.CollectionWhereInput = filter
      ? {
          ...(filter.authorId ? { authorId: filter.authorId } : {}),
          ...(filter.authorNameContains
            ? {
                author: {
                  username: {
                    contains: filter.authorNameContains,
                    mode: "insensitive",
                  },
                },
              }
            : {}),
          ...(filter.titleContains
            ? { title: { contains: filter.titleContains, mode: "insensitive" } }
            : {}),
        }
      : {};

    const queryOptions: Prisma.CollectionFindManyArgs = {
      where: queryFilter,
      include: {
        author: true,
        poems: true,
      },
      orderBy: [{ dateCreated: "desc" }, { id: "desc" }],
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

    const collections = await this.prisma.collection.findMany(queryOptions);

    return collections;
  }

  /**
   *
   **/
  async getLike({ id }: { id: string }) {
    const like = await this.prisma.like.findUnique({
      where: {
        id: id,
      },
      include: {
        author: true,
        poem: true,
      },
    });

    return like;
  }

  /**
   *
   **/
  async getLikes({
    authorId,
    poemId,
    limit,
    cursor,
  }: {
    authorId?: string;
    poemId?: string;
    limit?: number;
    cursor?: string;
  }) {
    const queryFilter: Prisma.LikeWhereInput = {
      ...(authorId ? { authorId } : {}),
      ...(poemId ? { poemId } : {}),
    };

    const queryOptions: Prisma.LikeFindManyArgs = {
      where: queryFilter,
      include: {
        author: true,
        poem: true,
      },
      orderBy: [{ datePublished: "desc" }, { id: "desc" }],
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

    const likes = await this.prisma.like.findMany(queryOptions);

    return likes;
  }

  /**
   *
   **/
  async getLikesCount({ poemId }: { poemId: string }) {
    const count = await this.prisma.like.count({
      where: {
        poemId,
      },
    });

    return count;
  }

  async getSavedPoem({ id }: { id: string }) {
    const savedPoem = await this.prisma.savedPoem.findUnique({
      where: { id },
      include: {
        author: true,
        poem: true,
      },
    });

    return savedPoem;
  }

  /**
   *
   **/
  async getSavedPoems({
    authorId,
    poemId,
    limit,
    cursor,
  }: {
    authorId?: string;
    poemId?: string;
    limit?: number;
    cursor?: string;
  }) {
    const queryFilter: Prisma.SavedPoemWhereInput = {
      ...(authorId ? { authorId } : {}),
      ...(poemId ? { poemId } : {}),
    };

    const queryOptions: Prisma.SavedPoemFindManyArgs = {
      where: queryFilter,
      include: {
        author: true,
        poem: true,
      },
      orderBy: [{ dateSaved: "desc" }, { id: "desc" }],
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

    const savedPoems = await this.prisma.savedPoem.findMany(queryOptions);

    return savedPoems;
  }

  /**
   *
   **/
  async getSavedPoemsCount({ poemId }: { poemId: string }) {
    const count = await this.prisma.savedPoem.count({
      where: {
        poemId,
      },
    });

    return count;
  }

  async getFollowedAuthor({ id }: { id: string }) {
    const followedAuthor = await this.prisma.followedAuthor.findUnique({
      where: { id },
      include: {
        follower: true,
        following: true,
      },
    });

    return followedAuthor;
  }

  /**
   *
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
  }) {
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

    const followedAuthors =
      await this.prisma.followedAuthor.findMany(queryOptions);

    return followedAuthors;
  }

  /**
   *
   **/
  async getFollowedAuthorsCount({
    followerId,
    followingId,
  }: {
    followerId?: string;
    followingId?: string;
  }) {
    const queryFilter: Prisma.FollowedAuthorWhereInput = {
      ...(followerId ? { followerId } : {}),
      ...(followingId ? { followingId } : {}),
    };

    const count = await this.prisma.followedAuthor.count({
      where: queryFilter,
    });

    return count;
  }

  /**
   *
   **/
  async createPoem({
    authorId,
    text,
    title,
    collectionId = undefined,
  }: {
    authorId: string;
    text: string;
    title: string;
    collectionId?: string;
  }) {
    this.validateInputStrings({ authorId, text, title, collectionId });
    const poem = await this.prisma.poem.create({
      data: {
        title,
        text,
        author: {
          connect: { id: authorId },
        },
        ...(collectionId
          ? { inCollection: { connect: { id: collectionId } } }
          : {}),
        views: 0,
      },
      include: {
        author: true,
        inCollection: true,
        likes: true,
        savedBy: true,
        comments: true,
      },
    });

    return poem;
  }

  /**
   *
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
    this.validateInputStrings({ username, email, password });

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
    return copy;
  }

  /**
   *
   **/
  async createComment({
    poemId,
    authorId,
    text,
  }: {
    poemId: string;
    authorId: string;
    text: string;
  }) {
    this.validateInputStrings({ poemId, authorId, text });
    const comment = await this.prisma.comment.create({
      data: {
        poemId,
        authorId,
        text,
      },
      include: {
        author: true,
        poem: true,
      },
    });

    return comment;
  }

  /**
   *
   **/
  async createCollection({
    authorId,
    title,
  }: {
    authorId: string;
    title: string;
  }) {
    this.validateInputStrings({ authorId, title });
    const collection = await this.prisma.collection.create({
      data: { authorId, title },
      include: { poems: true, author: true },
    });

    return collection;
  }

  /**
   *
   **/
  async createSavedPoem({
    poemId,
    authorId,
  }: {
    poemId: string;
    authorId: string;
  }) {
    this.validateInputStrings({ poemId, authorId });
    const savedPoem = await this.prisma.savedPoem.create({
      data: {
        poemId,
        authorId,
      },
      include: {
        author: true,
        poem: true,
      },
    });

    return savedPoem;
  }

  /**
   *
   **/
  async createLike({ poemId, authorId }: { poemId: string; authorId: string }) {
    this.validateInputStrings({ poemId, authorId });
    const like = await this.prisma.like.create({
      data: {
        poemId,
        authorId,
      },
      include: {
        author: true,
        poem: true,
      },
    });

    return like;
  }

  /**
   *
   **/
  async createFollowedAuthor({
    authorId,
    followingId,
  }: {
    authorId: string;
    followingId: string;
  }) {
    this.validateInputStrings({ authorId, followingId });
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

    return followedAuthor;
  }

  /**
   *
   **/
  async updatePoem({
    title,
    poemId,
    text,
    collectionId,
    views,
  }: UpdatePoemInput) {
    const data = {
      ...(title ? { title } : {}),
      ...(text ? { text } : {}),
      ...(collectionId ? { collectionId } : {}),
      ...(views ? { views } : {}),
    };

    this.validateInputStrings(data);

    const poem = await this.prisma.poem.update({
      where: {
        id: poemId,
      },
      data,
    });

    return poem;
  }

  /**
   *
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

    this.validateInputStrings(data);

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
    });

    return author;
  }

  /**
   *
   **/
  async updateCollection({ id, title }: UpdateCollectionInput) {
    this.validateInputStrings({ title });

    const collection = await this.prisma.collection.update({
      where: {
        id,
      },
      data: { title },
    });

    return collection;
  }

  /**
   *
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
      },
      omit: { password: true },
    });

    return author;
  }

  /**
   *
   **/
  async removePoem({ id }: { id: string }) {
    const poem = await this.prisma.poem.delete({
      where: {
        id,
      },
    });

    return poem;
  }

  /**
   *
   **/
  async removeComment({ id }: { id: string }) {
    const comment = await this.prisma.comment.delete({
      where: {
        id,
      },
    });

    return comment;
  }

  /**
   *
   **/
  async removeCollection({ id }: { id: string }) {
    const collection = await this.prisma.collection.delete({
      where: {
        id,
      },
    });

    return collection;
  }

  /**
   *
   **/
  async removeLike({ id }: { id: string }) {
    const like = await this.prisma.like.delete({
      where: {
        id,
      },
    });

    return like;
  }

  /**
   *
   **/
  async removeSavedPoem({ id }: { id: string }) {
    const savedPoem = await this.prisma.savedPoem.delete({
      where: {
        id,
      },
    });

    return savedPoem;
  }

  /**
   *
   **/
  async removeFollowedAuthor({ id }: { id: string }) {
    const followedAuthor = await this.prisma.followedAuthor.delete({
      where: {
        id,
      },
    });

    return followedAuthor;
  }
}
