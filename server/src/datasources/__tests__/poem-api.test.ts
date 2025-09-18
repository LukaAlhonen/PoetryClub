import { PoemAPI } from "../poem-api.js";
import prisma from "../../../libs/__mocks__/prisma.js";
import { PrismaClient } from "../../../generated/prisma/index.js";
import {
  CreatePoemInput,
  CreateUserInput,
  CreateCollectionInput,
  CreateSavedPoemInput,
  CreateCommentInput,
  CreateLikeInput,
} from "../../types.js";
import { describe, expect, test, vi } from "vitest";

vi.mock("../../../libs/prisma");

describe("PoemAPI", () => {
  describe("Using mocked prisma client", () => {
    const poemAPI = new PoemAPI(prisma);
    test("createUser, succeeds", async () => {
      const dateJoined = new Date();
      const newUser: CreateUserInput = {
        username: "test",
        password: "password",
        email: "test@domain.com",
      };
      prisma.user.create.mockResolvedValue({
        ...newUser,
        id: "1",
        dateJoined,
      });
      const result = await poemAPI.createUserWithPassword(newUser);
      expect(result).toStrictEqual({
        ...newUser,
        id: "1",
        dateJoined,
      });
    });

    test("createPoem, succeeds", async () => {
      const datePublished = new Date();
      const newPoem: CreatePoemInput = {
        title: "test_poem",
        text: "poem text",
        authorId: "1",
      };
      prisma.poem.create.mockResolvedValue({
        ...newPoem,
        id: "2",
        datePublished,
        views: 0,
        collectionId: null,
      });
      const result = await poemAPI.createPoem(newPoem);
      expect(result).toStrictEqual({
        ...newPoem,
        id: "2",
        datePublished,
        views: 0,
        collectionId: null,
      });
    });

    test("createPoem, with collectionId, succeeds", async () => {
      const datePublished = new Date();
      const newPoem: CreatePoemInput = {
        title: "test_poem",
        text: "poem text",
        authorId: "1",
        collectionId: "3",
      };
      prisma.poem.create.mockResolvedValue({
        ...newPoem,
        id: "2",
        datePublished,
        views: 0,
        collectionId: "3",
      });
      const result = await poemAPI.createPoem(newPoem);
      expect(result).toStrictEqual({
        ...newPoem,
        id: "2",
        datePublished,
        views: 0,
        collectionId: "3",
      });
    });

    test("createComment, succeeds", async () => {
      const datePublished = new Date();
      const newComment: CreateCommentInput = {
        authorId: "1",
        poemId: "2",
        datePublished,
        text: "comment text",
      };

      prisma.comment.create.mockResolvedValue({
        ...newComment,
        id: "3",
      });

      const result = await poemAPI.createComment(newComment);
      expect(result).toStrictEqual({
        ...newComment,
        id: "3",
      });
    });

    test("createCollection, succeeds", async () => {
      const dateCreated = new Date();
      const newCollection: CreateCollectionInput = {
        ownerId: "1",
        title: "test",
      };

      prisma.collection.create.mockResolvedValue({
        ...newCollection,
        id: "2",
        dateCreated,
      });

      const result = await poemAPI.createCollection(newCollection);
      expect(result).toStrictEqual({
        ...newCollection,
        id: "2",
        dateCreated,
      });
    });
  });

  // describe("Using real prisma client", () => {});
});
