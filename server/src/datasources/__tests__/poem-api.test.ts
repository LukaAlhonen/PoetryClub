import { PoemAPI } from "../poem-api.js";
import { prisma } from "../../../prisma/index.js";
import { describe, expect, test, vi } from "vitest";

import {
  createAuthorInputObject,
  createCollectionInputObject,
  createCommentInputObject,
  createLikeInputObject,
  createPoemInputObject,
  createSavedPoemInputObject,
} from "../../utils/tests/poem-api-test-utils.js";

// TODO: test-cases:
// - create author x
// - create poem with author x
// - create collection with author x
// - create poem with collection x
// - create comment for poem with author x
// - create savedpoem x
// - create like, verify likedpoems for author x
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

  test("createAuthor, succeeds", async () => {
    const newAuthor = createAuthorInputObject();

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
    const newAuthor = createAuthorInputObject();
    const testAuthor = await poemAPI.createAuthor(newAuthor);

    const newPoem = createPoemInputObject({ authorId: testAuthor.id });
    const result = await poemAPI.createPoem(newPoem);

    const authorPoems = await poemAPI.getPoems({
      filter: { authorId: testAuthor.id },
    });

    // check ids
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

    // make sure poem is included in authors poems
    expect(authorPoems.includes(result));
  });

  test("createPoem, with collection, succeeds", async () => {
    const newAuthor = createAuthorInputObject();
    const testAuthor = await poemAPI.createAuthor(newAuthor);

    const newCollection = createCollectionInputObject({
      authorId: testAuthor.id,
    });
    const testCollection = await poemAPI.createCollection(newCollection);

    const newPoem = createPoemInputObject({
      authorId: testAuthor.id,
      collectionId: testCollection.id,
    });
    const result = await poemAPI.createPoem(newPoem);

    const poemsInCollection = (await poemAPI.getCollection(testCollection.id))
      .poems;

    // check ids
    expect(result.id).toBeDefined();
    expect(result.author.id).toStrictEqual(result.authorId);
    expect(result.authorId).toStrictEqual(testAuthor.id);
    expect(result.inCollection.id).toStrictEqual(result.collectionId);
    expect(result.collectionId).toStrictEqual(testCollection.id);

    expect(result.title).toStrictEqual(newPoem.title);
    expect(result.text).toStrictEqual(newPoem.text);
    expect(result.datePublished).toBeDefined();
    expect(result.author).toBeDefined();
    expect(result.inCollection).toBeDefined();

    // make sure poem is included in collection
    expect(poemsInCollection.includes(result));
  });

  test("createCollection, succeeds", async () => {
    const newAuthor = createAuthorInputObject();
    const testAuthor = await poemAPI.createAuthor(newAuthor);

    const newCollection = createCollectionInputObject({
      authorId: testAuthor.id,
    });
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
    const newAuthor = createAuthorInputObject();
    const testAuthor = await poemAPI.createAuthor(newAuthor);

    const newPoem = createPoemInputObject({ authorId: testAuthor.id });
    const testPoem = await poemAPI.createPoem(newPoem);

    const newComment = createCommentInputObject({
      authorId: testAuthor.id,
      poemId: testPoem.id,
    });
    const result = await poemAPI.createComment(newComment);

    const authorComments = await poemAPI.getComments(testAuthor.id);

    expect(result.id).toBeDefined();
    expect(result.datePublished).toBeDefined();
    expect(result.text).toStrictEqual(newComment.text);

    // make sure all ids match
    expect(result.author.id).toStrictEqual(result.authorId);
    expect(result.authorId).toStrictEqual(testAuthor.id);
    expect(result.poem.id).toStrictEqual(result.poemId);
    expect(result.poemId).toStrictEqual(testPoem.id);

    // make sure comment appears in authors comments array
    expect(authorComments.includes(result));
  });

  test("createSavedPoem, succeeds", async () => {
    const newAuthor = createAuthorInputObject();
    const testAuthor = await poemAPI.createAuthor(newAuthor);

    const newPoem = createPoemInputObject({ authorId: testAuthor.id });
    const testPoem = await poemAPI.createPoem(newPoem);

    const newSavedPoem = createSavedPoemInputObject({
      authorId: testAuthor.id,
      poemId: testPoem.id,
    });
    const result = await poemAPI.createSavedPoem(newSavedPoem);

    // Get poems saved by user and use map to get only nested poem objects,
    // same for savedBy but with nested author object instead
    const savedPoems = (
      await poemAPI.getAuthorById(testAuthor.id)
    ).savedPoems.map((savedPoem) => savedPoem.poem);
    const savedBy = (await poemAPI.getPoem(testPoem.id)).savedBy.map(
      (savedPoem) => savedPoem.author,
    );

    // check ids
    expect(result.id).toBeDefined();
    expect(result.author.id).toStrictEqual(result.authorId);
    expect(result.authorId).toStrictEqual(testAuthor.id);
    expect(result.poem.id).toStrictEqual(result.poemId);
    expect(result.poemId).toStrictEqual(testPoem.id);

    expect(result.dateSaved).toBeDefined();

    // make sure poem appears in authors saved poems and author appears in poems savedby
    expect(savedPoems.includes(result.poem));
    expect(savedBy.includes(result.author));
  });

  test("createLike, succeeds", async () => {
    const newAuthor = createAuthorInputObject();
    const testAuthor = await poemAPI.createAuthor(newAuthor);

    const newPoem = createPoemInputObject({ authorId: testAuthor.id });
    const testPoem = await poemAPI.createPoem(newPoem);

    const newLike = createLikeInputObject({
      authorId: testAuthor.id,
      poemId: testPoem.id,
    });
    const result = await poemAPI.createLike(newLike);

    // Get liked poems for author and authors that liked poem
    const likedPoems = (
      await poemAPI.getAuthorById(testAuthor.id)
    ).likedPoems.map((like) => like.poem);
    const likedByAuthor = (await poemAPI.getPoem(testPoem.id)).likes.map(
      (like) => like.author,
    );

    // check ids
    expect(result.id).toBeDefined();
    expect(result.author.id).toStrictEqual(result.authorId);
    expect(result.authorId).toStrictEqual(testAuthor.id);
    expect(result.poem.id).toStrictEqual(result.poemId);
    expect(result.poemId).toStrictEqual(testPoem.id);

    expect(result.datePublished).toBeDefined();

    // Make sure poem appears in authors liked poems and author appears in poems likes
    expect(likedPoems.includes(result.poem));
    expect(likedByAuthor.includes(result.author));
  });
});
