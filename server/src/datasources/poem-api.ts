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
   * Returns an array of Poem objects,
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
   * Returns a Poem object matching the provied id
   * @param id - Poem id
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
    const author = await this.prisma.author.findUnique({
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
    const author = await this.prisma.author.findFirst({
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

    const copy = { ...author };
    if (omitPassword) delete copy.password;
    if (omitAuthVersion) delete copy.authVersion;

    return copy;
  }

  /**
   * Returns an array of Author objects, optionally filter by usernameContains
   * @param omitPassword - include password with returned author, omitted by default
   * @param omitAuthVersion - include authVersion with returned author, omitted by default
   * @param usernameContains
   * @param limit
   * @param cursor
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

    // remove password and authVersion from each author based on
    // omitPassword and omitAuthVersion params
    return authors.map((author) => {
      const copy = { ...author };
      if (omitPassword) delete copy.password;
      if (omitAuthVersion) delete copy.authVersion;
      return copy;
    });
  }

  /**
   * Returns a comment matching the provided id
   * @param id comment id
   **/
  async getComment({ id }: { id: string }) {
    const comment = await this.prisma.comment.findFirst({
      where: { id: id },
      include: { author: true, poem: true },
    });
    return comment;
  }

  /**
   * Returns array of Comment objects, optionally filter by author and or poem
   * @param authorId - filter by author
   * @param poemId - filter by poem
   * @param limit
   * @param cursor
   *
   * @example
   * const comments = await poemAPI.getComments({poemId: poem.id})
   * console.log(comments.length) // 10
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
   * Returns the number of comments for a given poem
   * @param poemId - poem to get commentsCount for
   * @returns Number representing the amount of comments for a given poem
   *
   * @example
   * const commentsCount = await poemAPI.getCommentsCount({poemId: poem.id})
   * console.log(commentsCount) // 10
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
   * Returns a Collection object matching the provided id
   * @param id - collection id
   **/
  async getCollection({ id }: { id: string }) {
    const collection = await this.prisma.collection.findUnique({
      where: { id: id },
      include: { author: true, poems: true },
    });

    return collection;
  }

  /**
   * Returns an Array of Collection objects, optioanlly filter by author, authorNameContains, titleContains
   * @param limit
   * @param cursor
   * @param filter
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
   * Returns a Like object matching the provided id
   * @param id - like id
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
   * Returns an array of Like objects, optionally filter by poem and or author
   * @param authorId - filter by author
   * @param poemId - filter by poem
   * @param limit
   * @param cursor
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
   * Returns number of Like objects for a specific poem
   * @param poemId - poem to filter by
   **/
  async getLikesCount({ poemId }: { poemId: string }) {
    const count = await this.prisma.like.count({
      where: {
        poemId,
      },
    });

    return count;
  }

  /**
   * Returns a SavedPoem object matching the provided id
   * @param id - SavedPoem id
   **/
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
   * Returns an array of SavedPoem objects, optianlly filter by poem and or author
   * @param authorId - author to filter by
   * @param poemId - poem to filter by
   * @limit
   * @cursor
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
   * Returns the number of SavedPoem objects for a Pome matching the given id
   * @param poemId - poem to filter by
   **/
  async getSavedPoemsCount({ poemId }: { poemId: string }) {
    const count = await this.prisma.savedPoem.count({
      where: {
        poemId,
      },
    });

    return count;
  }

  /**
   * Returns a FollowedAuthor object matching the given id
   * @param id - FollowedAuthor id
   **/
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
   * Returns the number of FollowedAuthor objects for following or follower
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
   * Create a new poem with the given input
   * @param authorId - poem author
   * @param text - poem text
   * @param title - pome title
   * @param collection - include poem in collection
   * @returns created Poem object
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
   * Create new comment with provided input
   * @param poemId - poem to associate comment with
   * @param authorId - comment author
   * @param text - comment text
   * @retursn created Comment object
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
   * Create Collection with provided input
   * @param authorId - collection author
   * @param title - collection title
   * @returns created Collection object
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
   * Creates a new SavedPoem object
   * @param poemId - Poem
   * @param authorId - Author
   * @returns created SavedPoem object
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
   * Creates Like
   * @param poemId - Poem
   * @param authorId - Author
   * @returns crated Like object
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
   * Update Poem with provided input
   * @param title - poem title
   * @param poemId - poem to update
   * @param text - poem text
   * @param collection - collection to include poem in
   * @param views - number of times poem has been viewed
   * @returns updated Poem object
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
   * Updates collection with provided input
   * @param id - collection to update
   * @param title - update collection title
   * @returns updated Colleciton object
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
      },
      omit: { password: true },
    });

    return author;
  }

  /**
   * Remove Poem
   * @param id - poem to remove
   * @returns removed Poem object
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
   * Removes Comments
   * @param - comment to remove
   * @returns removed Commet object
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
   * Removes Collection
   * @param id - collection to remove
   * @returns removed Collection object
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
   * Removes Like
   * @param id - like to remove
   * @returns remvoed Like object
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
   * Removes SavedPoem
   * @param id - savedPoem to remove
   * @returns removed SavedPoem object
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

    return followedAuthor;
  }
}
