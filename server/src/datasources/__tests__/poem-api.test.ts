import { PoemAPI } from "../poem-api.js";
import { prisma } from "../../../prisma/index.js";
import { describe, expect, test } from "vitest";
import { v4 } from "uuid";
import argon2 from "argon2";

import {
  createAuthorInputObject,
  createCollectionInputObject,
  createCommentInputObject,
  createPoemInputObject,
} from "../../utils/tests/poem-api-test-utils.js";
import { CacheAPI } from "../../cache/cache-api.js";

describe("Prisma PoemAPI Integration Tests", () => {
  const cache = new CacheAPI({ prefix: "poemAPI" });
  const poemAPI = new PoemAPI(prisma, cache);

  const testId = v4(); // for testing with invalid ids

  beforeEach(async () => {
    await cache.delByPattern({ pattern: "*" });
  });

  test("getPoem, succeeds", async () => {
    const testAuthor = await poemAPI.createAuthor(createAuthorInputObject());
    const testPoem = await poemAPI.createPoem(
      createPoemInputObject({ authorId: testAuthor.id }),
    );

    const result = await poemAPI.getPoem({ id: testPoem.id });
    expect(result).toStrictEqual(testPoem);
  });

  test("getPoems, succeeds", async () => {
    const testAuthor = await poemAPI.createAuthor(
      createAuthorInputObject({ username: "peter" }),
    );
    const testPoem = await poemAPI.createPoem(
      createPoemInputObject({ authorId: testAuthor.id }),
    );
    const testPoem2 = await poemAPI.createPoem(
      createPoemInputObject({
        authorId: testAuthor.id,
        title: "peters second poem",
      }),
    );
    const testPoem3 = await poemAPI.createPoem(
      createPoemInputObject({
        authorId: testAuthor.id,
        title: "bb",
        text: "aa",
      }),
    );

    await expect(poemAPI.getPoems()).resolves.toStrictEqual([
      testPoem3,
      testPoem2,
      testPoem,
    ]);
    await expect(
      poemAPI.getPoems({ filter: { authorId: testAuthor.id } }),
    ).resolves.toStrictEqual([testPoem3, testPoem2, testPoem]);
    await expect(
      poemAPI.getPoems({ filter: { authorNameContains: "pe" } }),
    ).resolves.toStrictEqual([testPoem3, testPoem2, testPoem]);
    await expect(
      poemAPI.getPoems({ filter: { titleContains: "peter" } }),
    ).resolves.toStrictEqual([testPoem2]);
    await expect(
      poemAPI.getPoems({ filter: { textContains: "a" } }),
    ).resolves.toStrictEqual([testPoem3]);
    await expect(poemAPI.getPoems({ limit: 1 })).resolves.toStrictEqual([
      testPoem3,
    ]);
    await expect(
      poemAPI.getPoems({ limit: 2, cursor: testPoem3.id }),
    ).resolves.toStrictEqual([testPoem2, testPoem]);
  });

  test("getAuthorById, succeeds", async () => {
    const testAuthor = await poemAPI.createAuthor(createAuthorInputObject());

    const result = await poemAPI.getAuthorById({ id: testAuthor.id });

    expect(result).toStrictEqual(testAuthor);
    expect(result.authVersion).toBeUndefined();
    expect(result.password).toBeUndefined();
  });

  test("getAuthorByUsername, succeeds", async () => {
    const testAuthor = await poemAPI.createAuthor(createAuthorInputObject());

    const result = await poemAPI.getAuthorByUsername({
      username: testAuthor.username,
    });

    expect(result).toStrictEqual(testAuthor);
    expect(result.authVersion).toBeUndefined();
    expect(result.password).toBeUndefined();
  });

  test("getAuthors, succeeds", async () => {
    const testAuthor = await poemAPI.createAuthor(createAuthorInputObject());
    const testAuthor2 = await poemAPI.createAuthor(
      createAuthorInputObject({
        username: "testauthor2",
        email: "test.author2@domain.com",
      }),
    );
    const testAuthor3 = await poemAPI.createAuthor(
      createAuthorInputObject({
        username: "testauthor3",
        email: "test.author3@domain.com",
      }),
    );

    await expect(poemAPI.getAuthors({})).resolves.toStrictEqual([
      testAuthor3,
      testAuthor2,
      testAuthor,
    ]);
    await expect(
      poemAPI.getAuthors({ usernameContains: "2" }),
    ).resolves.toStrictEqual([testAuthor2]);
    await expect(poemAPI.getAuthors({ limit: 1 })).resolves.toStrictEqual([
      testAuthor3,
    ]);
    await expect(
      poemAPI.getAuthors({ limit: 2, cursor: testAuthor3.id }),
    ).resolves.toStrictEqual([testAuthor2, testAuthor]);
  });

  test("getCollection, succeeds", async () => {
    const testAuthor = await poemAPI.createAuthor(createAuthorInputObject());
    const testCollection = await poemAPI.createCollection({
      authorId: testAuthor.id,
      title: "testCollection",
    });

    const result = await poemAPI.getCollection({ id: testCollection.id });

    expect(result).toStrictEqual(testCollection);
  });

  test("getCollections, succeeds", async () => {
    const testAuthor = await poemAPI.createAuthor({
      username: "pelle",
      email: "pelle@domain.com",
      password: "password",
    });
    const testCollection = await poemAPI.createCollection({
      authorId: testAuthor.id,
      title: "testCollection",
    });
    const testCollection2 = await poemAPI.createCollection({
      authorId: testAuthor.id,
      title: "testCollection2",
    });

    await expect(
      poemAPI.getCollections({
        filter: { authorId: testAuthor.id },
      }),
    ).resolves.toStrictEqual([testCollection2, testCollection]);
    await expect(
      poemAPI.getCollections({
        filter: { authorNameContains: "p" },
      }),
    ).resolves.toStrictEqual([testCollection2, testCollection]);
    await expect(poemAPI.getCollections({ limit: 1 })).resolves.toStrictEqual([
      testCollection2,
    ]);
    await expect(
      poemAPI.getCollections({ limit: 1, cursor: testCollection2.id }),
    ).resolves.toStrictEqual([testCollection]);
  });

  test("getComment, succeeds", async () => {
    const testAuthor = await poemAPI.createAuthor(createAuthorInputObject());
    const testPoem = await poemAPI.createPoem(
      createPoemInputObject({ authorId: testAuthor.id }),
    );
    const testComment = await poemAPI.createComment(
      createCommentInputObject({
        poemId: testPoem.id,
        authorId: testAuthor.id,
      }),
    );

    const result = await poemAPI.getComment({ id: testComment.id });

    expect(result).toStrictEqual(testComment);
  });

  test("getComments, succeeds", async () => {
    const testAuthor = await poemAPI.createAuthor(createAuthorInputObject());
    const testPoem = await poemAPI.createPoem(
      createPoemInputObject({ authorId: testAuthor.id }),
    );
    const testComment = await poemAPI.createComment(
      createCommentInputObject({
        poemId: testPoem.id,
        authorId: testAuthor.id,
      }),
    );
    const testComment2 = await poemAPI.createComment(
      createCommentInputObject({
        poemId: testPoem.id,
        authorId: testAuthor.id,
      }),
    );

    await expect(
      poemAPI.getComments({ authorId: testAuthor.id }),
    ).resolves.toStrictEqual([testComment2, testComment]);
    await expect(
      poemAPI.getComments({ poemId: testPoem.id }),
    ).resolves.toStrictEqual([testComment2, testComment]);
    await expect(poemAPI.getComments({ limit: 1 })).resolves.toStrictEqual([
      testComment2,
    ]);
    await expect(
      poemAPI.getComments({ limit: 1, cursor: testComment2.id }),
    ).resolves.toStrictEqual([testComment]);
    await expect(poemAPI.getComments({})).resolves.toStrictEqual([
      testComment2,
      testComment,
    ]);
  });

  test("getLike, succeeds", async () => {
    const testAuthor = await poemAPI.createAuthor(createAuthorInputObject());
    const testPoem = await poemAPI.createPoem(
      createPoemInputObject({ authorId: testAuthor.id }),
    );

    const testLike = await poemAPI.createLike({
      authorId: testAuthor.id,
      poemId: testPoem.id,
    });

    await expect(poemAPI.getLike({ id: testLike.id })).resolves.toStrictEqual(
      testLike,
    );
  });

  test("getLikes, succeeds", async () => {
    const testAuthor = await poemAPI.createAuthor(createAuthorInputObject());
    const testAuthor2 = await poemAPI.createAuthor(
      createAuthorInputObject({
        username: "testauthor2",
        email: "test.author2@domain.com",
      }),
    );
    const testAuthor3 = await poemAPI.createAuthor(
      createAuthorInputObject({
        username: "testauthor3",
        email: "test.author3@domain.com",
      }),
    );
    const testPoem = await poemAPI.createPoem(
      createPoemInputObject({ authorId: testAuthor.id }),
    );
    const testLike = await poemAPI.createLike({
      authorId: testAuthor.id,
      poemId: testPoem.id,
    });
    const testLike2 = await poemAPI.createLike({
      authorId: testAuthor2.id,
      poemId: testPoem.id,
    });
    const testLike3 = await poemAPI.createLike({
      authorId: testAuthor3.id,
      poemId: testPoem.id,
    });

    await expect(
      poemAPI.getLikes({ poemId: testPoem.id }),
    ).resolves.toStrictEqual([testLike3, testLike2, testLike]);
    await expect(
      poemAPI.getLikes({ authorId: testAuthor.id }),
    ).resolves.toStrictEqual([testLike]);
    await expect(
      poemAPI.getLikes({ authorId: testAuthor2.id }),
    ).resolves.toStrictEqual([testLike2]);
    await expect(
      poemAPI.getLikes({ authorId: testAuthor3.id }),
    ).resolves.toStrictEqual([testLike3]);
    await expect(
      poemAPI.getLikes({ poemId: testPoem.id, limit: 1 }),
    ).resolves.toStrictEqual([testLike3]);
    await expect(
      poemAPI.getLikes({ poemId: testPoem.id, limit: 2, cursor: testLike3.id }),
    ).resolves.toStrictEqual([testLike2, testLike]);
  });

  test("getSavedPoem, succeeds", async () => {
    const testAuthor = await poemAPI.createAuthor(createAuthorInputObject());
    const testPoem = await poemAPI.createPoem(
      createPoemInputObject({ authorId: testAuthor.id }),
    );

    const testSavedPoem = await poemAPI.createSavedPoem({
      authorId: testAuthor.id,
      poemId: testPoem.id,
    });

    await expect(
      poemAPI.getSavedPoem({ id: testSavedPoem.id }),
    ).resolves.toStrictEqual(testSavedPoem);
  });

  test("getSavedPoems, succeeds", async () => {
    const testAuthor = await poemAPI.createAuthor(
      createAuthorInputObject({ omitPassword: false }),
    );
    const testPoem = await poemAPI.createPoem(
      createPoemInputObject({
        title: "poem by peter",
        authorId: testAuthor.id,
      }),
    );
    const testPoem2 = await poemAPI.createPoem(
      createPoemInputObject({
        title: "poem by jonas",
        authorId: testAuthor.id,
      }),
    );
    const testPoem3 = await poemAPI.createPoem(
      createPoemInputObject({
        title: "poem by lukas",
        authorId: testAuthor.id,
      }),
    );

    const testSavedPoem = await poemAPI.createSavedPoem({
      authorId: testAuthor.id,
      poemId: testPoem.id,
    });
    const testSavedPoem2 = await poemAPI.createSavedPoem({
      authorId: testAuthor.id,
      poemId: testPoem2.id,
    });
    const testSavedPoem3 = await poemAPI.createSavedPoem({
      authorId: testAuthor.id,
      poemId: testPoem3.id,
    });

    await expect(
      poemAPI.getSavedPoems({ authorId: testAuthor.id }),
    ).resolves.toStrictEqual([testSavedPoem3, testSavedPoem2, testSavedPoem]);
    await expect(
      poemAPI.getSavedPoems({ poemId: testPoem.id }),
    ).resolves.toStrictEqual([testSavedPoem]);
    await expect(poemAPI.getSavedPoems({ limit: 1 })).resolves.toStrictEqual([
      testSavedPoem3,
    ]);
    await expect(
      poemAPI.getSavedPoems({ limit: 2, cursor: testSavedPoem3.id }),
    ).resolves.toStrictEqual([testSavedPoem2, testSavedPoem]);
  });
  test("getFollowedAuthor, succeeds", async () => {
    const followerAuthor = await poemAPI.createAuthor({
      omitPassword: false,
      username: "pelle",
      email: "pelle@gmail.com",
      password: "password",
    });
    const followedAuthor = await poemAPI.createAuthor({
      omitPassword: false,
      username: "linus",
      email: "linus@icloud.com",
      password: "password",
    });

    const testFollowedAuthor = await poemAPI.createFollowedAuthor({
      authorId: followerAuthor.id,
      followingId: followedAuthor.id,
    });

    await expect(
      poemAPI.getFollowedAuthor({ id: testFollowedAuthor.id }),
    ).resolves.toStrictEqual(testFollowedAuthor);
  });

  test("getFollowedAuthors, succeeds", async () => {
    // pelle and kalle follow linux
    const followerAuthor = await poemAPI.createAuthor({
      omitPassword: false,
      username: "pelle",
      email: "pelle@gmail.com",
      password: "password",
    });
    const followerAuthor2 = await poemAPI.createAuthor({
      omitPassword: false,
      username: "kalle",
      email: "kalle@live.com",
      password: "password",
    });
    const followedAuthor = await poemAPI.createAuthor({
      omitPassword: false,
      username: "linus",
      email: "linus@icloud.com",
      password: "password",
    });

    // make pelle follow linus
    const testFollowedAuthor = await poemAPI.createFollowedAuthor({
      authorId: followerAuthor.id,
      followingId: followedAuthor.id,
    });

    // make kalle follow linus
    const testFollowedAuthor2 = await poemAPI.createFollowedAuthor({
      authorId: followerAuthor2.id,
      followingId: followedAuthor.id,
    });

    // get followerIds form linus
    const followedAuthorIds = (
      await poemAPI.getAuthorById({
        id: followedAuthor.id,
      })
    ).followedBy.map((followedAuthor) => followedAuthor.followerId);

    // make sure pelle and kalle follow linus
    await expect(
      poemAPI.getFollowedAuthors({ followingId: followedAuthor.id }),
    ).resolves.toStrictEqual([testFollowedAuthor2, testFollowedAuthor]);

    expect(followedAuthorIds.includes(followerAuthor.id));
    expect(followedAuthorIds.includes(followerAuthor2.id));

    // make sure pelle follows linus
    await expect(
      poemAPI.getFollowedAuthors({ followerId: followerAuthor.id }),
    ).resolves.toStrictEqual([testFollowedAuthor]);

    // make sure kalle follows linus
    await expect(
      poemAPI.getFollowedAuthors({ followerId: followerAuthor2.id }),
    ).resolves.toStrictEqual([testFollowedAuthor2]);
  });

  test("createAuthor, succeeds", async () => {
    const password = "password";
    const newAuthor = createAuthorInputObject({
      omitPassword: false,
      password,
    });

    const result = await poemAPI.createAuthor({
      ...newAuthor,
      omitPassword: false,
    });

    // verify author was created
    await expect(
      poemAPI.getAuthorById({ id: result.id, omitPassword: false }),
    ).resolves.toStrictEqual(result);

    // verify username, email, password
    expect(result.username).toBe(newAuthor.username);
    expect(argon2.verify(result.password, password));
    expect(result.email).toBe(newAuthor.email);
    expect(result.authVersion).toBeUndefined();
  });

  test("createAuthor, fails", async () => {
    await poemAPI.createAuthor({
      username: "user",
      email: "user@domain.com",
      password: "password",
      omitPassword: true,
    });

    // unique constraint error on username
    await expect(
      poemAPI.createAuthor({
        username: "user",
        email: "pp@domain.com",
        password: "password",
      }),
    ).rejects.toThrow();
    // unique constraint error on email
    await expect(
      poemAPI.createAuthor({
        username: "pp",
        email: "user@domain.com",
        password: "password",
      }),
    ).rejects.toThrow();
    // empty string for username
    await expect(
      poemAPI.createAuthor({
        username: "",
        email: "email@domain.com",
        password: "password",
      }),
    ).rejects.toThrow();
    // empty string for email
    await expect(
      poemAPI.createAuthor({
        username: "user",
        email: "",
        password: "password",
      }),
    ).rejects.toThrow();
    // empty string for password
    await expect(
      poemAPI.createAuthor({
        username: "user",
        email: "pp@domain.com",
        password: "",
      }),
    ).rejects.toThrow();
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

  test("createPoem, fails", async () => {
    const testAuthor = await poemAPI.createAuthor(createAuthorInputObject());
    // create poem with non-existent authorId
    await expect(
      poemAPI.createPoem(createPoemInputObject({ authorId: testId })),
    ).rejects.toThrow();
    // create pome with empty title
    await expect(
      poemAPI.createPoem(
        createPoemInputObject({ authorId: testAuthor.id, title: "" }),
      ),
    ).rejects.toThrow();
    // create poem with empty text
    await expect(
      poemAPI.createPoem(
        createPoemInputObject({ authorId: testAuthor.id, text: "" }),
      ),
    ).rejects.toThrow();
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

    const poemsInCollection = (
      await poemAPI.getCollection({ id: testCollection.id })
    ).poems;

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

  test("createPoem, with collection, fails", async () => {
    const testAuthor = await poemAPI.createAuthor(createAuthorInputObject());

    // create poem with non-existent collectionId
    await expect(
      poemAPI.createPoem(
        createPoemInputObject({
          authorId: testAuthor.id,
          collectionId: testId,
        }),
      ),
    ).rejects.toThrow();
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

  test("createCollection, fails", async () => {
    const testAuthor = await poemAPI.createAuthor(createAuthorInputObject());
    // create collection with non-existent authorId
    await expect(
      poemAPI.createCollection({ title: "collection", authorId: testId }),
    ).rejects.toThrow();
    // create collection with empty title
    await expect(
      poemAPI.createCollection({ title: "", authorId: testAuthor.id }),
    ).rejects.toThrow();
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

    const authorComments = await poemAPI.getComments({
      authorId: testAuthor.id,
    });

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

  test("createComment, fails", async () => {
    const testAuthor = await poemAPI.createAuthor(createAuthorInputObject());
    const testPoem = await poemAPI.createPoem(
      createPoemInputObject({ authorId: testAuthor.id }),
    );

    // create comment with non-existent authorId
    await expect(
      poemAPI.createComment({
        text: "comment",
        poemId: testPoem.id,
        authorId: testId,
      }),
    ).rejects.toThrow();
    // create comment with non-existent poemId
    await expect(
      poemAPI.createComment({
        text: "comment",
        poemId: testId,
        authorId: testAuthor.id,
      }),
    ).rejects.toThrow();
    // create comment with empty text
    await expect(
      poemAPI.createComment({
        text: "",
        poemId: testPoem.id,
        authorId: testAuthor.id,
      }),
    ).rejects.toThrow();
  });

  test("createSavedPoem, succeeds", async () => {
    const newAuthor = createAuthorInputObject();
    const testAuthor = await poemAPI.createAuthor(newAuthor);

    const newPoem = createPoemInputObject({ authorId: testAuthor.id });
    const testPoem = await poemAPI.createPoem(newPoem);

    const result = await poemAPI.createSavedPoem({
      authorId: testAuthor.id,
      poemId: testPoem.id,
    });

    const savedPoemIds = (
      await poemAPI.getSavedPoems({ authorId: testAuthor.id })
    ).map((savedPoem) => savedPoem.poemId);

    const savedByIds = (
      await poemAPI.getSavedPoems({ poemId: testPoem.id })
    ).map((savedPoem) => savedPoem.authorId);

    // check ids
    expect(result.id).toBeDefined();
    expect(result.author.id).toStrictEqual(result.authorId);
    expect(result.authorId).toStrictEqual(testAuthor.id);
    expect(result.poem.id).toStrictEqual(result.poemId);
    expect(result.poemId).toStrictEqual(testPoem.id);

    expect(result.dateSaved).toBeDefined();

    // make sure poem appears in authors saved poems and author appears in poems savedby
    expect(savedPoemIds.includes(result.poem.id));
    expect(savedByIds.includes(result.author.id));
  });

  test("createSavedPoem, fails", async () => {
    const testAuthor = await poemAPI.createAuthor(createAuthorInputObject());
    const testPoem = await poemAPI.createPoem(
      createPoemInputObject({ authorId: testAuthor.id }),
    );

    // create savedPoem with invalid poemId
    await expect(
      poemAPI.createSavedPoem({ authorId: testAuthor.id, poemId: testId }),
    ).rejects.toThrow();
    // create savedPoem with invalid authorId
    await expect(
      poemAPI.createSavedPoem({ authorId: testId, poemId: testPoem.id }),
    ).rejects.toThrow();
  });

  test("createLike, succeeds", async () => {
    const newAuthor = createAuthorInputObject();
    const testAuthor = await poemAPI.createAuthor(newAuthor);

    const newPoem = createPoemInputObject({ authorId: testAuthor.id });
    const testPoem = await poemAPI.createPoem(newPoem);

    const result = await poemAPI.createLike({
      authorId: testAuthor.id,
      poemId: testPoem.id,
    });

    // Get liked poems for author and authors that liked poem
    // Only getting the ids since I don not feel like overcomplicating this by fetching the entire poem and author objects
    const likedPoemIds = (
      await poemAPI.getLikes({ authorId: testAuthor.id })
    ).map((like) => like.poemId);
    const likedByAuthorIds = (
      await poemAPI.getLikes({ poemId: testPoem.id })
    ).map((like) => like.authorId);

    // check ids
    expect(result.id).toBeDefined();
    expect(result.author.id).toStrictEqual(result.authorId);
    expect(result.authorId).toStrictEqual(testAuthor.id);
    expect(result.poem.id).toStrictEqual(result.poemId);
    expect(result.poemId).toStrictEqual(testPoem.id);

    expect(result.datePublished).toBeDefined();

    // Make sure poem appears in authors liked poems and author appears in poems likes
    expect(likedPoemIds.includes(result.poem.id));
    expect(likedByAuthorIds.includes(result.authorId));
  });

  test("createLike, fails", async () => {
    const testAuthor = await poemAPI.createAuthor(createAuthorInputObject());
    const testPoem = await poemAPI.createPoem(
      createPoemInputObject({ authorId: testAuthor.id }),
    );

    // create like with invalid poemId
    await expect(
      poemAPI.createLike({ authorId: testAuthor.id, poemId: testId }),
    ).rejects.toThrow();
    // create like with invalid authorId
    await expect(
      poemAPI.createLike({ authorId: testId, poemId: testPoem.id }),
    ).rejects.toThrow();
  });

  test("createFollowedAuthor, succeeds", async () => {
    const newAuthor1 = createAuthorInputObject({
      username: "testauthor1",
      email: "test.author1@domain.com",
    });
    const newAuthor2 = createAuthorInputObject({
      username: "testauthor2",
      email: "test.author2@domain.com",
    });

    const followerAuthor = await poemAPI.createAuthor(newAuthor1); // author that follows other author
    const followingAuthor = await poemAPI.createAuthor(newAuthor2); // author that is followed by other author

    const result = await poemAPI.createFollowedAuthor({
      authorId: followerAuthor.id,
      followingId: followingAuthor.id,
    });

    const followedByIds = (
      await poemAPI.getFollowedAuthors({ followerId: result.followerId })
    ).map((followedUser) => followedUser.followerId);
    const followingIds = (
      await poemAPI.getFollowedAuthors({ followingId: result.followingId })
    ).map((followedUser) => followedUser.followingId);

    // check ids
    expect(result.id).toBeDefined();
    expect(result.follower.id).toStrictEqual(result.followerId);
    expect(result.followerId).toStrictEqual(followerAuthor.id);
    expect(result.following.id).toStrictEqual(result.followingId);
    expect(result.followingId).toStrictEqual(followingAuthor.id);

    // make sure followerAuthor appears in followingAuthors followers and vice versa
    expect(followedByIds.includes(result.followerId));
    expect(followingIds.includes(result.followingId));
  });

  test("createFollowedAuthor, fails", async () => {
    const testAuthor = await poemAPI.createAuthor(createAuthorInputObject());

    // create followedAuthor with nonexistent followerId
    await expect(
      poemAPI.createFollowedAuthor({
        authorId: testId,
        followingId: testAuthor.id,
      }),
    ).rejects.toThrow();
    // create followedAuthor with nonexistent followingId
    await expect(
      poemAPI.createFollowedAuthor({
        authorId: testAuthor.id,
        followingId: testId,
      }),
    ).rejects.toThrow();
    // create followedAuthor with same value for followingId and followerId
    await expect(
      poemAPI.createFollowedAuthor({
        authorId: testAuthor.id,
        followingId: testAuthor.id,
      }),
    ).rejects.toThrow();
  });

  test("updateAuthor, username, password and email, succeeds", async () => {
    const newAuthor = createAuthorInputObject();
    const testAuthor = await poemAPI.createAuthor(newAuthor);

    // Update author username
    const updateUsernameAuthor = await poemAPI.updateAuthor({
      authorId: testAuthor.id,
      username: "prince",
    });
    expect(updateUsernameAuthor.username).toStrictEqual("prince"); // check username for returned author object
    expect(
      (await poemAPI.getAuthorById({ id: testAuthor.id })).username,
    ).toStrictEqual("prince"); // query author from db and chech username

    // Update author email
    const updateEmailAuthor = await poemAPI.updateAuthor({
      authorId: testAuthor.id,
      email: "prince@domain.com",
    });
    expect(updateEmailAuthor.email).toStrictEqual("prince@domain.com");
    expect(
      (await poemAPI.getAuthorById({ id: testAuthor.id })).email,
    ).toStrictEqual("prince@domain.com");

    // Update author password
    const updateAuthorPassword = await poemAPI.updateAuthor({
      authorId: testAuthor.id,
      password: "1234",
      omitPassword: false,
    });
    assert(argon2.verify(updateAuthorPassword.password, "1234"));
    const author = await poemAPI.getAuthorById({
      id: testAuthor.id,
      omitPassword: false,
    });
    expect(author.password).toStrictEqual(updateAuthorPassword.password);
    expect(author.authVersion).toBeUndefined();
  });

  test("updateAuthor, username, email, fails", async () => {
    const testAuthor = await poemAPI.createAuthor(createAuthorInputObject());
    await poemAPI.createAuthor(
      createAuthorInputObject({
        username: "username",
        email: "username@domain.com",
      }),
    );

    // unique constraint error on username
    await expect(
      poemAPI.updateAuthor({ authorId: testAuthor.id, username: "username" }),
    ).rejects.toThrow();
    // unique constraint error on email
    await expect(
      poemAPI.updateAuthor({
        authorId: testAuthor.id,
        email: "username@domain.com",
      }),
    ).rejects.toThrow();
    // update author with invalid authorId
    await expect(poemAPI.updateAuthor({ authorId: testId })).rejects.toThrow();
    // update author with empty username
    await expect(
      poemAPI.updateAuthor({
        authorId: testAuthor.id,
        username: " \n",
      }),
    ).rejects.toThrow();
    // update authro with empty email
    await expect(
      poemAPI.updateAuthor({
        authorId: testAuthor.id,
        email: " \n\t",
      }),
    ).rejects.toThrow();
    // update author with empty password
    await expect(
      poemAPI.updateAuthor({
        authorId: testAuthor.id,
        password: "\t\t",
      }),
    ).rejects.toThrow();
  });

  test("updatePoem, title, text, inCollection, succeeds", async () => {
    const testAuthor = await poemAPI.createAuthor(createAuthorInputObject());
    const testCollection = await poemAPI.createCollection(
      createCollectionInputObject({ authorId: testAuthor.id }),
    );
    const testPoem = await poemAPI.createPoem(
      createPoemInputObject({ authorId: testAuthor.id }),
    );

    // update title
    const updateTitlePoem = await poemAPI.updatePoem({
      poemId: testPoem.id,
      title: "update",
    });
    expect(updateTitlePoem.title).toStrictEqual("update");
    expect((await poemAPI.getPoem({ id: testPoem.id })).title).toStrictEqual(
      "update",
    );

    // update text
    const updateTextPoem = await poemAPI.updatePoem({
      poemId: testPoem.id,
      text: "update text",
    });
    expect(updateTextPoem.text).toStrictEqual("update text");
    expect((await poemAPI.getPoem({ id: testPoem.id })).text).toStrictEqual(
      "update text",
    );

    // update collectionId, make sure poem appears in collection
    const updateCollectionPoem = await poemAPI.updatePoem({
      poemId: testPoem.id,
      collectionId: testCollection.id,
    });
    expect(updateCollectionPoem.collectionId).toStrictEqual(testCollection.id);
    expect(
      (await poemAPI.getCollection({ id: testCollection.id })).poems.includes(
        updateCollectionPoem,
      ),
    );
  });

  test("updatePoem, inCollection, fails", async () => {
    const testAuthor = await poemAPI.createAuthor(createAuthorInputObject());
    const testPoem = await poemAPI.createPoem(
      createPoemInputObject({ authorId: testAuthor.id }),
    );

    // update poem with invalid collectionId
    await expect(
      poemAPI.updatePoem({ poemId: testPoem.id, collectionId: testId }),
    ).rejects.toThrow();
    // update poem with invalid poemId
    await expect(poemAPI.updatePoem({ poemId: testId })).rejects.toThrow();
  });

  test("updateCollection, title, succeeds", async () => {
    const testAuthor = await poemAPI.createAuthor(createAuthorInputObject());
    const testCollection = await poemAPI.createCollection(
      createCollectionInputObject({ authorId: testAuthor.id }),
    );

    const updateTitleCollection = await poemAPI.updateCollection({
      id: testCollection.id,
      title: "my silly poems",
    });
    expect(updateTitleCollection.title).toStrictEqual("my silly poems");
    expect(
      (await poemAPI.getCollection({ id: testCollection.id })).title,
    ).toStrictEqual("my silly poems");
  });

  test("updateCollection, fails", async () => {
    const testAuthor = await poemAPI.createAuthor(createAuthorInputObject());
    const testCollection = await poemAPI.createCollection(
      createCollectionInputObject({ authorId: testAuthor.id }),
    );

    // update collection with invalid collectionId
    await expect(
      poemAPI.updateCollection({ id: "1", title: "title" }),
    ).rejects.toThrow();
    // update collection with empty string for title
    await expect(
      poemAPI.updateCollection({
        id: testCollection.id,
        title: "",
      }),
    ).rejects.toThrow();
  });

  test("remove author, succeeds", async () => {
    // create author and add poem, collection, savedPoem, likedPoem, followedAuthor, comment
    const testAuthor = await poemAPI.createAuthor(createAuthorInputObject());

    const testPoem = await poemAPI.createPoem(
      createPoemInputObject({ authorId: testAuthor.id }),
    );

    const testComment = await poemAPI.createComment(
      createCommentInputObject({
        authorId: testAuthor.id,
        poemId: testPoem.id,
      }),
    );

    const testCollection = await poemAPI.createCollection(
      createCollectionInputObject({ authorId: testAuthor.id }),
    );

    const testAuthor2 = await poemAPI.createAuthor(
      createAuthorInputObject({
        username: "testauthor2",
        email: "test.author2@domain.com",
      }),
    );

    const testFollowedAuthor = await poemAPI.createFollowedAuthor({
      authorId: testAuthor.id,
      followingId: testAuthor2.id,
    });

    const testPoem2 = await poemAPI.createPoem(
      createPoemInputObject({ authorId: testAuthor2.id, title: "testpoem2" }),
    );

    const testPoem3 = await poemAPI.createPoem(
      createPoemInputObject({ authorId: testAuthor2.id, title: "testpoem3" }),
    );

    const testSavedPoem = await poemAPI.createSavedPoem({
      authorId: testAuthor.id,
      poemId: testPoem2.id,
    });

    const testLike = await poemAPI.createLike({
      authorId: testAuthor.id,
      poemId: testPoem3.id,
    });

    await poemAPI.removeAuthor({ id: testAuthor.id });

    // make sure author was deleted
    await expect(
      poemAPI.getAuthorById({ id: testAuthor.id }),
    ).resolves.toStrictEqual({});
    // make sure poem is deleted
    await expect(poemAPI.getPoem({ id: testPoem.id })).resolves.toBeNull();
    // make sure collection is deleted
    await expect(
      poemAPI.getCollection({ id: testCollection.id }),
    ).resolves.toBeNull();
    // make sure comment is deleted
    await expect(
      poemAPI.getComment({ id: testComment.id }),
    ).resolves.toBeNull();
    // make sure testAuthor2 is no longer followed
    await expect(
      poemAPI.getFollowedAuthor({ id: testFollowedAuthor.id }),
    ).resolves.toBeNull();
    // make sure testPoem2 is no longer saved
    await expect(
      poemAPI.getSavedPoem({ id: testSavedPoem.id }),
    ).resolves.toBeNull();
    // make sure testPoem3 is no longer liked
    await expect(poemAPI.getLike({ id: testLike.id })).resolves.toBeNull();
  });

  test("removePoem, succeeds", async () => {
    const testAuthor = await poemAPI.createAuthor(createAuthorInputObject());
    const testAuthor2 = await poemAPI.createAuthor(
      createAuthorInputObject({
        username: "testauthor2",
        email: "test.author2@domain.com",
      }),
    );
    const testAuthor3 = await poemAPI.createAuthor(
      createAuthorInputObject({
        username: "testauthor3",
        email: "test.author3@domain.com",
      }),
    );

    const testPoem = await poemAPI.createPoem(
      createPoemInputObject({ authorId: testAuthor.id }),
    );

    const testComment = await poemAPI.createComment(
      createCommentInputObject({
        authorId: testAuthor.id,
        poemId: testPoem.id,
      }),
    );

    const testLike = await poemAPI.createLike({
      authorId: testAuthor2.id,
      poemId: testPoem.id,
    });

    const testSavedPoem = await poemAPI.createSavedPoem({
      authorId: testAuthor3.id,
      poemId: testPoem.id,
    });

    await poemAPI.removePoem({ id: testPoem.id });

    // make sure poem was deleted
    await expect(poemAPI.getPoem({ id: testPoem.id })).resolves.toBeNull();
    // make sure poem does not appear in author poems
    await expect(
      poemAPI.getPoems({ filter: { authorId: testAuthor.id } }),
    ).resolves.toStrictEqual([]);
    // make sure comment was deleted
    await expect(
      poemAPI.getComment({ id: testComment.id }),
    ).resolves.toBeNull();
    // make sure like was deleted
    await expect(poemAPI.getLike({ id: testLike.id })).resolves.toBeNull();
    // make sure saved poem was deleted
    await expect(
      poemAPI.getSavedPoem({ id: testSavedPoem.id }),
    ).resolves.toBeNull();
  });

  test("removeCollection, succeeds", async () => {
    const testAuthor = await poemAPI.createAuthor(createAuthorInputObject());

    const testCollection = await poemAPI.createCollection(
      createCollectionInputObject({ authorId: testAuthor.id }),
    );

    const testPoem = await poemAPI.createPoem(
      createPoemInputObject({
        authorId: testAuthor.id,
        collectionId: testCollection.id,
      }),
    );

    await poemAPI.removeCollection({ id: testCollection.id });

    // make sure collection was deleted
    await expect(
      poemAPI.getCollection({ id: testCollection.id }),
    ).resolves.toBeNull();
    // make sure inCollection for poem is null
    expect(
      (await poemAPI.getPoem({ id: testPoem.id })).inCollection,
    ).toBeNull();
  });

  test("removeSavedPoem, succeeds", async () => {
    const testAuthor = await poemAPI.createAuthor(createAuthorInputObject());

    const testPoem = await poemAPI.createPoem(
      createPoemInputObject({
        authorId: testAuthor.id,
      }),
    );

    const savedPoem = await poemAPI.createSavedPoem({
      authorId: testAuthor.id,
      poemId: testPoem.id,
    });

    await poemAPI.removeSavedPoem({ id: savedPoem.id });

    // make sure savedPoem was remove
    expect(await poemAPI.getSavedPoem({ id: savedPoem.id })).toBeNull();
    // make sure author does not appear in poem savedBy
    expect(
      !(await poemAPI.getPoem({ id: testPoem.id })).savedBy
        .map((savedPoem) => savedPoem.authorId)
        .includes(testAuthor.id),
    );
  });

  test("removeLike, succeeds", async () => {
    const testAuthor = await poemAPI.createAuthor(createAuthorInputObject());

    const testPoem = await poemAPI.createPoem(
      createPoemInputObject({
        authorId: testAuthor.id,
      }),
    );

    const testLike = await poemAPI.createLike({
      authorId: testAuthor.id,
      poemId: testPoem.id,
    });

    await poemAPI.removeLike({ id: testLike.id });

    // make sure like was removed
    expect(await poemAPI.getLike({ id: testLike.id })).toBeNull();
    // make sure author does not appear in poem likes
    expect(
      !(await poemAPI.getPoem({ id: testPoem.id })).likes
        .map((like) => like.authorId)
        .includes(testAuthor.id),
    );
  });

  test("removeComment, succeeds", async () => {
    const testAuthor = await poemAPI.createAuthor(createAuthorInputObject());

    const testPoem = await poemAPI.createPoem(
      createPoemInputObject({
        authorId: testAuthor.id,
      }),
    );

    const testComment = await poemAPI.createComment(
      createCommentInputObject({
        authorId: testAuthor.id,
        poemId: testPoem.id,
      }),
    );

    await poemAPI.removeComment({ id: testComment.id });

    // make sure comment was removed
    expect(await poemAPI.getComment({ id: testComment.id })).toBeNull();
    // make sure comment does not appear in poem comments
    expect(
      !(await poemAPI.getPoem({ id: testPoem.id })).comments
        .map((comment) => comment.id)
        .includes(testComment.id),
    );
  });

  test("incrementPoemViews, succeeds", async () => {
    const testAuthor = await poemAPI.createAuthor(createAuthorInputObject());

    const testPoem = await poemAPI.createPoem(
      createPoemInputObject({
        authorId: testAuthor.id,
      }),
    );

    expect(testPoem.views).toBe(0);
    const result = await poemAPI.incrementPoemViews({ poemId: testPoem.id });
    const updatedPoem = await poemAPI.getPoem({ id: testPoem.id });
    expect(updatedPoem.views).toBe(1);
    expect(result.views).toBe(1);
  });
});
