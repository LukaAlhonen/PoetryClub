import { PrismaClient, Prisma } from "../../generated/prisma/client.js";
import { KeyValueCache } from "@apollo/utils.keyvaluecache";
import {
  CreateCollectionInput,
  CreateCommentInput,
  CreateLikeInput,
  CreatePoemInput,
  CreateSavedPoemInput,
  CreateUserInput,
  GetPoemsFilter,
  UpdateCollectionInput,
  UpdatePoemInput,
  UpdateUserInput,
} from "../types.js";

// TODO: Implement redis caching for all functions
export class PoemAPI {
  constructor(private prisma: PrismaClient) {}

  // Get all poems, optionally filter by author
  async getPoems(
    cursor: string,
    limit: number,
    filter?: GetPoemsFilter | null,
  ) {
    // Add fields from filter to queryfilter if they are present
    const queryFilter: Prisma.PoemWhereInput = filter
      ? {
          ...(filter.authorId ? { authorId: filter.authorId } : {}),
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
      include: { author: true, likes: true },
      take: limit,
      orderBy: { datePublished: "desc" },
    };

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
  async getPoem(id: string) {
    const poem = await this.prisma.poem.findFirst({
      where: { id: id },
      include: { author: true, inCollection: true },
    });
    return poem;
  }

  // Get user by id
  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      omit: {
        password: true,
      },
      where: { id: id },
      include: {
        poems: true,
        savedPoems: true,
        likedPoems: true,
        collections: true,
        comments: true,
      },
    });
    return user;
  }

  // Get all users
  async getUsers() {
    const users = await this.prisma.user.findMany({
      omit: {
        password: true,
      },
      include: {
        poems: true,
        savedPoems: true,
        likedPoems: true,
        collections: true,
        comments: true,
      },
    });
    return users;
  }

  // Search for user by name
  async getUserByName(username: string) {
    const user = await this.prisma.user.findFirst({
      where: { username: username },
      omit: { password: true },
      include: {
        poems: true,
        savedPoems: true,
        likedPoems: true,
        collections: true,
        comments: true,
      },
    });

    return user;
  }

  async getUserWithPassword(username: string) {
    const user = await this.prisma.user.findFirst({
      where: { username: username },
      include: {
        poems: true,
        savedPoems: true,
        likedPoems: true,
        collections: true,
        comments: true,
      },
    });

    return user;
  }

  // Get comment by id
  async getComment(id: string) {
    const comment = await this.prisma.comment.findFirst({ where: { id: id } });
    return comment;
  }

  // Get all comments, optionally filter by user and poem
  async getComments(authorId: string | null, poemId: string | null) {
    const filter = {
      ...(authorId !== null && { authorId }),
      ...(poemId !== null && { poemId }),
    };

    const comments = await this.prisma.comment.findMany({
      where: filter,
      include: { author: true },
    });

    return comments;
  }

  // Get collection by id
  async getCollection(id: string) {
    const collection = await this.prisma.collection.findUnique({
      where: { id: id },
      include: { owner: true, poems: true },
    });

    return collection;
  }

  // Get collections for specific user
  // TODO: extend to allow filtering based on text included in collection title, username, included poems title/text
  async getCollections(userId: string) {
    const collections = await this.prisma.collection.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        owner: true,
        poems: true,
      },
    });

    return collections;
  }

  // Add new poem
  async createPoem(input: CreatePoemInput) {
    const poem = await this.prisma.poem.create({
      data: {
        title: input.title,
        text: input.text,
        author: {
          connect: { id: input.authorId },
        },
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

  // Add new user
  async createUser(input: CreateUserInput) {
    const user = await this.prisma.user.create({
      data: input,
      include: {
        poems: true,
        savedPoems: true,
        likedPoems: true,
        collections: true,
        comments: true,
      },
    });

    const { password, ...userWihtoutPassword } = user;

    return userWihtoutPassword;
  }

  // For testing purposes, should not be used normally
  // since it returns the password hash with the user object
  async createUserWithPassword(input: CreateUserInput) {
    const user = await this.prisma.user.create({
      data: input,
      include: {
        poems: true,
        savedPoems: true,
        likedPoems: true,
        collections: true,
        comments: true,
      },
    });

    return user;
  }

  // Add new comment
  async createComment(input: CreateCommentInput) {
    const comment = await this.prisma.comment.create({
      data: input,
    });

    return comment;
  }

  async createCollection(input: CreateCollectionInput) {
    const collection = await this.prisma.collection.create({
      data: input,
      include: { poems: true },
    });

    return collection;
  }

  async createSavedPoem(input: CreateSavedPoemInput) {
    const savedPoem = await this.prisma.savedPoem.create({
      data: input,
    });

    return savedPoem;
  }

  async createLike(input: CreateLikeInput) {
    const like = await this.prisma.like.create({
      data: input,
    });

    return like;
  }

  // Edit poem, mainly for testing
  async updatePoem(input: UpdatePoemInput) {
    const data = {
      ...(input.title ? { title: input.title } : {}),
      ...(input.authorId ? { authorId: input.authorId } : {}),
      ...(input.text ? { text: input.text } : {}),
      ...(input.datePublished ? { datePublished: input.datePublished } : {}),
      ...(input.collectionId ? { collectionId: input.collectionId } : {}),
      ...(input.views ? { views: input.views } : {}),
    };

    const poem = await this.prisma.poem.update({
      where: {
        id: input.poemId,
      },
      data: data,
    });

    console.log(`Data: ${data.collectionId} Poem: ${poem.collectionId}`);

    return poem;
  }

  async updateUser(input: UpdateUserInput) {
    const data = {
      ...(input.userId ? { userId: input.userId } : {}),
      ...(input.username ? { username: input.username } : {}),
      ...(input.password ? { password: input.password } : {}),
      ...(input.email ? { email: input.email } : {}),
    };

    const user = await this.prisma.user.update({
      where: {
        id: input.userId,
      },
      data: data,
    });

    return user;
  }

  async updateCollection(input: UpdateCollectionInput) {
    const data = input.title ? { title: input.title } : {};

    const collection = await this.prisma.collection.update({
      where: {
        id: input.id,
      },
      data: data,
    });

    return collection;
  }

  async removeUser(id: string) {
    const user = await this.prisma.user.delete({
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
    });

    return user;
  }

  async removePoem(id: string) {
    const poem = await this.prisma.poem.delete({
      where: {
        id: id,
      },
    });

    return poem;
  }

  async removeComment(id: string) {
    const comment = await this.prisma.comment.delete({
      where: {
        id: id,
      },
    });

    return comment;
  }

  async removeCollection(id: string) {
    const collection = await this.prisma.collection.delete({
      where: {
        id: id,
      },
    });

    return collection;
  }

  async removeLike(id: string) {
    const like = await this.prisma.like.delete({
      where: {
        id: id,
      },
    });

    return like;
  }

  async removeSavedPoem(id: string) {
    const savedPoem = await this.prisma.savedPoem.delete({
      where: {
        id: id,
      },
    });

    return savedPoem;
  }
}
