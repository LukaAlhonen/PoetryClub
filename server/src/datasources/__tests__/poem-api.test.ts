import { PoemAPI } from "../poem-api.js";
import { prisma } from "../../../prisma/index.js";
import {
  CreatePoemInput,
  CreateUserInput,
  CreateCollectionInput,
  CreateSavedPoemInput,
  CreateCommentInput,
  CreateLikeInput,
} from "../../types.js";
import { describe, expect, test, vi } from "vitest";

describe("Integration Tests", () => {
  const poemAPI = new PoemAPI(prisma);

  test("createUser, succeeds", async () => {
    const newUser: CreateUserInput = {
      username: "testuser2",
      password: "password",
      email: "testuser@domain.com",
    };

    const result = await poemAPI.createUserWithPassword(newUser);

    expect(result.id).toBeDefined();
    expect(result.username).toBe(newUser.username);
    expect(result.password).toBe(newUser.password);
    expect(result.email).toBe(newUser.email);
    expect(result.collections).toStrictEqual([]);
    expect(result.poems).toStrictEqual([]);
    expect(result.savedPoems).toStrictEqual([]);
    expect(result.likedPoems).toStrictEqual([]);
    expect(result.comments).toStrictEqual([]);
  });

  test("createPoem, succeeds", async () => {
    const newUser: CreateUserInput = {
      username: "testuser2",
      password: "password",
      email: "testuser@domain.com",
    };

    const testUser = await poemAPI.createUserWithPassword(newUser);

    const newPoem: CreatePoemInput = {
      authorId: testUser.id,
      title: "testpoem",
      text: "testpoemtext",
    };

    const result = await poemAPI.createPoem(newPoem);

    expect(result.id).toBeDefined();
    expect(result.title).toStrictEqual(newPoem.title);
    expect(result.text).toStrictEqual(newPoem.text);
    expect(result.inCollection).toStrictEqual(null);
    expect(result.likes).toStrictEqual([]);
    expect(result.comments).toStrictEqual([]);
    expect(result.savedBy).toStrictEqual([]);
  });
});
