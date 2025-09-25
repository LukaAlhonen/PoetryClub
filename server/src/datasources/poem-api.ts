import { PrismaClient, Prisma } from "../../generated/prisma/client.js";
import {
  CreateCollectionInput,
  CreateCommentInput,
  CreateLikeInput,
  CreatePoemInput,
  CreateSavedPoemInput,
  CreateAuthorInput,
  GetPoemsFilter,
  UpdateCollectionInput,
  UpdatePoemInput,
  UpdateAuthorInput,
  CreateFollowedAuthorInput,
  GetCollectionsFilter,
} from "../types.js";

import { AuthorModel, AuthorWithPasswordModel } from "../models.js";

// TODO: Implement redis caching for all functions
export class PoemAPI {
  constructor(private prisma: PrismaClient) {}

  private validateInputStrings(input: Object) {
    Object.entries(input).forEach((entry) => {
      if (entry[1] instanceof String || typeof entry[1] === "string") {
        if (entry[1].trim() === "") {
          throw new Error(`${entry[0]} cannot be an empty string`);
        }
      }
    });
  }

  // Get all poems, optianlly filter based on authorId, collectionId
  // textContains, titleContains, authornameContains
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
      orderBy: { datePublished: "desc" },
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

  // Get poem by id
  async getPoem({ id }: { id: string }) {
    const poem = await this.prisma.poem.findFirst({
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

  async getAuthorById(options: {
    id: string;
    omitPassword: false;
  }): Promise<AuthorWithPasswordModel>;

  async getAuthorById(options: {
    id: string;
    omitPassword?: boolean;
  }): Promise<AuthorModel>;

  // Get author by id
  async getAuthorById({
    id,
    omitPassword = true,
  }: {
    id: string;
    omitPassword?: boolean;
  }) {
    const author = await this.prisma.author.findUnique({
      omit: {
        password: omitPassword,
      },
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
    return author;
  }

  async getAuthorByUsername(options: {
    username: string;
    omitPassword: false;
  }): Promise<AuthorWithPasswordModel>;

  async getAuthorByUsername(options: {
    username: string;
    omitPassword?: boolean;
  }): Promise<AuthorModel>;

  // Search for author by name
  async getAuthorByUsername({
    username,
    omitPassword = true,
  }: {
    username: string;
    omitPassword?: boolean;
  }) {
    const author = await this.prisma.author.findFirst({
      where: { username: username },
      omit: { password: omitPassword },
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

    return author;
  }

  async getAuthors(options: {
    omitPassword: false;
    usernameContains?: string;
    limit?: number;
    cursor?: string;
  }): Promise<AuthorWithPasswordModel[]>;

  async getAuthors(options: {
    omitPassword?: boolean;
    usernameContains?: string;
    limit?: number;
    cursor?: string;
  }): Promise<AuthorModel[]>;

  // Get all users
  async getAuthors({
    omitPassword = true,
    usernameContains,
    limit,
    cursor,
  }: {
    omitPassword?: boolean;
    usernameContains?: string;
    limit?: number;
    cursor?: string;
  }) {
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
      omit: { password: omitPassword },
      orderBy: {
        dateJoined: "desc",
      },
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

    return authors;
  }

  // Get comment by id
  async getComment({ id }: { id: string }) {
    const comment = await this.prisma.comment.findFirst({
      where: { id: id },
      include: { author: true, poem: true },
    });
    return comment;
  }

  // Get all comments, optionally filter by author and poem
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
      orderBy: {
        datePublished: "desc",
      },
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

  // Get collection by id
  async getCollection({ id }: { id: string }) {
    const collection = await this.prisma.collection.findUnique({
      where: { id: id },
      include: { author: true, poems: true },
    });

    return collection;
  }

  // Get collections, optionally filter by authorId, username contains, title contains
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
      orderBy: { dateCreated: "desc" },
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

  // Get like by id
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

  // get likes, optionally filter by authorId or poemId
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
      orderBy: {
        datePublished: "desc",
      },
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

  // get savedPoems, optionally filter by authorId or poemId
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
      orderBy: {
        dateSaved: "desc",
      },
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

  // get followed authors, optionally filter by followerId or followingId
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
      orderBy: {
        dateFollowed: "asc",
      },
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

  // Add new poem
  async createPoem({
    authorId,
    text,
    title,
    collectionId = undefined,
  }: CreatePoemInput) {
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

  // Add new author
  async createAuthor({
    username,
    email,
    password,
    omitPassword,
  }: CreateAuthorInput) {
    const data = {
      username,
      email,
      password,
    };
    this.validateInputStrings(data);
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

    if (omitPassword) {
      const { password, ...userWihtoutPassword } = author;
      return userWihtoutPassword;
    }
    return author;
  }

  // Add new comment
  async createComment(input: CreateCommentInput) {
    this.validateInputStrings(input);
    const comment = await this.prisma.comment.create({
      data: input,
      include: {
        author: true,
        poem: true,
      },
    });

    return comment;
  }

  async createCollection(input: CreateCollectionInput) {
    this.validateInputStrings(input);
    const collection = await this.prisma.collection.create({
      data: input,
      include: { poems: true, author: true },
    });

    return collection;
  }

  async createSavedPoem(input: CreateSavedPoemInput) {
    const savedPoem = await this.prisma.savedPoem.create({
      data: input,
      include: {
        author: true,
        poem: true,
      },
    });

    return savedPoem;
  }

  async createLike(input: CreateLikeInput) {
    const like = await this.prisma.like.create({
      data: input,
      include: {
        author: true,
        poem: true,
      },
    });

    return like;
  }

  async createFollowedAuthor(input: CreateFollowedAuthorInput) {
    // author cannot follow themself
    if (input.followerId === input.followingId) {
      throw new Error("An author cannot follow themself");
    }
    const followedAuthor = await this.prisma.followedAuthor.create({
      data: input,
      include: {
        follower: true,
        following: true,
      },
    });

    return followedAuthor;
  }

  // Edit poem, mainly for testing
  async updatePoem({
    title,
    poemId,
    text,
    datePublished,
    collectionId,
    views,
  }: UpdatePoemInput) {
    const data = {
      ...(title ? { title } : {}),
      ...(text ? { text } : {}),
      ...(datePublished ? { datePublished } : {}),
      ...(collectionId ? { collectionId } : {}),
      ...(views ? { views } : {}),
    };

    this.validateInputStrings(data);

    const poem = await this.prisma.poem.update({
      where: {
        id: poemId,
      },
      data: data,
    });

    return poem;
  }

  async updateAuthor({
    authorId,
    username,
    password,
    email,
    omitPassword,
  }: UpdateAuthorInput) {
    const data = {
      ...(username ? { username } : {}),
      ...(password ? { password } : {}),
      ...(email ? { email } : {}),
    };

    this.validateInputStrings(data);

    const author = await this.prisma.author.update({
      where: {
        id: authorId,
      },
      data: data,
      omit: { password: omitPassword },
    });

    return author;
  }

  async updateCollection({ id, title }: UpdateCollectionInput) {
    this.validateInputStrings({ title });

    const collection = await this.prisma.collection.update({
      where: {
        id: id,
      },
      data: { title },
    });

    return collection;
  }

  async removeAuthor({ id }: { id: string }) {
    const author = await this.prisma.author.delete({
      where: {
        id: id,
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

  async removePoem({ id }: { id: string }) {
    const poem = await this.prisma.poem.delete({
      where: {
        id: id,
      },
    });

    return poem;
  }

  async removeComment({ id }: { id: string }) {
    const comment = await this.prisma.comment.delete({
      where: {
        id: id,
      },
    });

    return comment;
  }

  async removeCollection({ id }: { id: string }) {
    const collection = await this.prisma.collection.delete({
      where: {
        id: id,
      },
    });

    return collection;
  }

  async removeLike({ id }: { id: string }) {
    const like = await this.prisma.like.delete({
      where: {
        id: id,
      },
    });

    return like;
  }

  async removeSavedPoem({ id }: { id: string }) {
    const savedPoem = await this.prisma.savedPoem.delete({
      where: {
        id: id,
      },
    });

    return savedPoem;
  }
}
