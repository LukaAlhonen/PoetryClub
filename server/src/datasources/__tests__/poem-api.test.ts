import { PoemAPI } from "../poem-api.js";
import { prisma } from "../../../prisma/index.js";
import {
  CreatePoemInput,
  CreateAuthorInput,
  CreateCollectionInput,
  CreateSavedPoemInput,
  CreateCommentInput,
  CreateLikeInput,
} from "../../types.js";
import { describe, expect, test, vi } from "vitest";
import { PoemAPITestUtils } from "../../utils/tests/poem-api-test-utils.js";

// TODO: test-cases:
// - create author x
// - create poem with author x
// - create collection with author x
// - create poem with collection x
// - create comment for poem with author
// - create savedpoem
// - create like, verify likedpoems for author
// - edit author, username, password, email
// - edit pome, title, text, add to collection
// - edit comment
// - edit collection
// - remove author, make sure all authors poems, collections, commets, likes, savedpoems are deleted
// - remove poem, make sure all comments, likes, savedPoem are deleted too
// - remove collection, make sure inCollection for all poems formerly in collection becomes null and make sure collection no longer in author collections
// - remove savedPoem, make sure poem and author are not deleted
// - remove like
// - remove comment

describe("Prisma PoemAPI Integration Tests", () => {
  const poemAPI = new PoemAPI(prisma);
  const testUtils = new PoemAPITestUtils(poemAPI);

  test("createAuthor, succeeds", async () => {
    const newAuthor = testUtils.createAuthorInputObject();

    const result = await poemAPI.createAuthorWithPassword(newAuthor);

    expect(result.id).toBeDefined();
    expect(result.username).toBe(newAuthor.username);
    expect(result.password).toBe(newAuthor.password);
    expect(result.email).toBe(newAuthor.email);
    expect(result.collections).toStrictEqual([]);
    expect(result.poems).toStrictEqual([]);
    expect(result.savedPoems).toStrictEqual([]);
    expect(result.likedPoems).toStrictEqual([]);
    expect(result.comments).toStrictEqual([]);
  });

  test("createPoem, succeeds", async () => {
    const newAuthor = testUtils.createAuthorInputObject();
    const testAuthor = await poemAPI.createAuthor(newAuthor);

    const newPoem = testUtils.createPoemInputObject(testAuthor.id);

    const result = await poemAPI.createPoem(newPoem);

    expect(result.id).toBeDefined();
    expect(result.author).toBeDefined();
    expect(result.author.id).toStrictEqual(result.authorId);
    expect(result.authorId).toStrictEqual(testAuthor.id);
    expect(result.title).toStrictEqual(newPoem.title);
    expect(result.text).toStrictEqual(newPoem.text);
    expect(result.inCollection).toStrictEqual(null);
    expect(result.likes).toStrictEqual([]);
    expect(result.comments).toStrictEqual([]);
    expect(result.savedBy).toStrictEqual([]);
    expect(result.datePublished).toBeDefined();
  });

  test("createPoem, with collection, succeeds", async () => {
    const newAuthor = testUtils.createAuthorInputObject();
    const testAuthor = await poemAPI.createAuthor(newAuthor);

    const newCollection = testUtils.createCollectionInputObject(testAuthor.id);
    const testCollection = await poemAPI.createCollection(newCollection);

    const newPoem = testUtils.createPoemInputObject(
      testAuthor.id,
      testCollection.id,
    );
    const result = await poemAPI.createPoem(newPoem);

    expect(result.id).toBeDefined();
    expect(result.title).toStrictEqual(newPoem.title);
    expect(result.text).toStrictEqual(newPoem.text);
    expect(result.datePublished).toBeDefined();
    expect(result.author).toBeDefined();
    expect(result.author.id).toStrictEqual(result.authorId);
    expect(result.authorId).toStrictEqual(testAuthor.id);
    expect(result.inCollection).toBeDefined();
    expect(result.inCollection.id).toStrictEqual(result.collectionId);
    expect(result.collectionId).toStrictEqual(testCollection.id);
  });

  test("createCollection, succeeds", async () => {
    const newAuthor = testUtils.createAuthorInputObject();
    const testAuthor = await poemAPI.createAuthor(newAuthor);

    const newCollection = testUtils.createCollectionInputObject(testAuthor.id);
    const result = await poemAPI.createCollection(newCollection);

    expect(result.id).toBeDefined();
    expect(result.title).toStrictEqual(newCollection.title);
    expect(result.author).toBeDefined();
    expect(result.author.id).toStrictEqual(result.authorId);
    expect(result.authorId).toStrictEqual(testAuthor.id);
    expect(result.poems).toStrictEqual([]);
    expect(result.dateCreated).toBeDefined();
  });

  test("createComment, succeeds", async () => {
    const testPoem = await testUtils.createDefaultTestPoem();
    const testAuthor = testPoem.author;

    const newComment = testUtils.createCommentInputObject(
      testAuthor.id,
      testPoem.id,
    );

    const result = await poemAPI.createComment(newComment);

    expect(result.id).toBeDefined();
    expect(result.datePublished).toBeDefined();
    expect(result.text).toStrictEqual(newComment.text);
    expect(result.author.id).toStrictEqual(result.authorId);
    expect(result.authorId).toStrictEqual(testAuthor.id);
    expect(result.poem.id).toStrictEqual(result.poemId);
    expect(result.poemId).toStrictEqual(testPoem.id);
  });
});
