import { PrismaClient, Prisma } from "../../generated/prisma/client.js";
import { KeyValueCache } from "@apollo/utils.keyvaluecache";
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
} from "../types.js";

// TODO: Implement redis caching for all functions
export class PoemAPI {
  constructor(private prisma: PrismaClient) {}

  // Get all poems, optionally filter by author
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
        author: { omit: { password: true } },
        likes: true,
        savedBy: { include: { author: { omit: { password: true } } } },
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
  async getPoem(id: string) {
    const poem = await this.prisma.poem.findFirst({
      where: { id: id },
      include: {
        author: { omit: { password: true } },
        inCollection: true,
        savedBy: {
          include: { author: { omit: { password: true } } },
        },
      },
    });
    return poem;
  }

  // Get author by id
  async getAuthorById(id: string) {
    const author = await this.prisma.author.findUnique({
      omit: {
        password: true,
      },
      where: { id: id },
      include: {
        poems: true,
        savedPoems: { include: { poem: true } },
        likedPoems: { include: { poem: true } },
        collections: true,
        comments: true,
      },
    });
    return author;
  }

  // Get all users
  async getAuthors() {
    const authors = await this.prisma.author.findMany({
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
    return authors;
  }

  // Search for author by name
  async getAuthorByName(username: string) {
    const author = await this.prisma.author.findFirst({
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

    return author;
  }

  async getAuthorWithPassword(username: string) {
    const author = await this.prisma.author.findFirst({
      where: { username: username },
      include: {
        poems: true,
        savedPoems: true,
        likedPoems: true,
        collections: true,
        comments: true,
      },
    });

    return author;
  }

  // Get comment by id
  async getComment(id: string) {
    const comment = await this.prisma.comment.findFirst({
      where: { id: id },
      include: { author: { omit: { password: true } }, poem: true },
    });
    return comment;
  }

  // Get all comments, optionally filter by author and poem
  async getComments(authorId?: string | null, poemId?: string | null) {
    const filter = {
      ...(authorId ? { authorId } : {}),
      ...(poemId ? { poemId } : {}),
    };

    const comments = await this.prisma.comment.findMany({
      where: filter,
      include: { author: { omit: { password: true } }, poem: true },
    });

    return comments;
  }

  // Get collection by id
  async getCollection(id: string) {
    const collection = await this.prisma.collection.findUnique({
      where: { id: id },
      include: { author: { omit: { password: true } }, poems: true },
    });

    return collection;
  }

  // Get collections for specific author
  // TODO: extend to allow filtering based on text included in collection title, username, included poems title/text
  async getCollections(authorId: string) {
    const collections = await this.prisma.collection.findMany({
      where: {
        authorId: authorId,
      },
      include: {
        author: {
          omit: {
            password: true,
          },
        },
        poems: true,
      },
    });

    return collections;
  }

  // Get like by id
  async getLike(id: string) {
    const like = await this.prisma.like.findUnique({
      where: {
        id: id,
      },
      include: {
        author: {
          omit: {
            password: true,
          },
        },
        poem: true,
      },
    });

    return like;
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
        ...(input.collectionId
          ? {
              inCollection: {
                connect: { id: input.collectionId },
              },
            }
          : {}),
        views: 0,
      },
      include: {
        author: {
          omit: { password: true },
        },
        inCollection: true,
        likes: true,
        savedBy: true,
        comments: true,
      },
    });

    return poem;
  }

  // Add new author
  async createAuthor(input: CreateAuthorInput) {
    const author = await this.prisma.author.create({
      data: input,
      include: {
        poems: true,
        savedPoems: true,
        likedPoems: true,
        collections: true,
        comments: true,
      },
    });

    const { password, ...userWihtoutPassword } = author;

    return userWihtoutPassword;
  }

  // For testing purposes, should not be used normally
  // since it returns the password hash with the author object
  async createAuthorWithPassword(input: CreateAuthorInput) {
    const author = await this.prisma.author.create({
      data: input,
      include: {
        poems: true,
        savedPoems: true,
        likedPoems: true,
        collections: true,
        comments: true,
      },
    });

    return author;
  }

  // Add new comment
  async createComment(input: CreateCommentInput) {
    const comment = await this.prisma.comment.create({
      data: input,
      include: {
        author: {
          omit: {
            password: true,
          },
        },
        poem: true,
      },
    });

    return comment;
  }

  async createCollection(input: CreateCollectionInput) {
    const collection = await this.prisma.collection.create({
      data: input,
      include: { poems: true, author: { omit: { password: true } } },
    });

    return collection;
  }

  async createSavedPoem(input: CreateSavedPoemInput) {
    const savedPoem = await this.prisma.savedPoem.create({
      data: input,
      include: {
        author: {
          omit: { password: true },
        },
        poem: true,
      },
    });

    return savedPoem;
  }

  async createLike(input: CreateLikeInput) {
    const like = await this.prisma.like.create({
      data: input,
      include: {
        author: {
          omit: { password: true },
        },
        poem: true,
      },
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

  async updateAuthor(input: UpdateAuthorInput) {
    const data = {
      ...(input.authorId ? { authorId: input.authorId } : {}),
      ...(input.username ? { username: input.username } : {}),
      ...(input.password ? { password: input.password } : {}),
      ...(input.email ? { email: input.email } : {}),
    };

    const author = await this.prisma.author.update({
      where: {
        id: input.authorId,
      },
      data: data,
    });

    return author;
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

  async removeAuthor(id: string) {
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
    });

    return author;
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
