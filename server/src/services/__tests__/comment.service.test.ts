import { prisma } from "../../../prisma/index.js";
import { CacheAPI } from "../../cache/cache-api.js";
import { seed } from "../../utils/tests/seed-test-db.js";
import { randomUUID } from "node:crypto";
import { createServices } from "../index.js";
import { CommentWithRelations } from "../../types/extended-types.js";
import { compareCommentFields } from "../../utils/tests/compare-fields.js";

const sortComments = ({
  comments,
}: {
  comments: CommentWithRelations[];
}): CommentWithRelations[] => {
  comments.sort((a, b) => {
    const dateDiff = b.datePublished.getTime() - a.datePublished.getTime();
    if (dateDiff !== 0) return dateDiff;
    return b.id.localeCompare(a.id);
  });

  return comments;
};

describe("CommentService integration tests", () => {
  const cache = new CacheAPI({ prefix: "CommentService" });
  const services = createServices({ prisma, cache });
  const testId = randomUUID();
  let comments: CommentWithRelations[] = [];

  beforeEach(async () => {
    await cache.delByPattern({ pattern: "*" });
    const seedResult = await seed({ prisma });
    comments = sortComments({ comments: seedResult.comments });
  });

  test("getComment", async () => {
    for (const comment of comments) {
      const result = await services.commentService.getComment({
        id: comment.id,
      });
      expect(result).toBeDefined()
      compareCommentFields(result, comment);
    }
  });

  test("getComments", async () => {
    const result = await services.commentService.getComments()
    expect(result).toBeDefined();
    expect(result).toHaveLength(comments.length)
    for (let i = 0; i < result.length; ++i) {
      compareCommentFields(result[i], comments[i])
    }
  })

  test("getComments, with pagination", async () => {
    const result1 = await services.commentService.getComments({
      first: 10
    })
    expect(result1).toBeDefined()
    expect(result1).toHaveLength(10)

    let i = 0;
    for (; i < result1.length; ++i) {
      compareCommentFields(result1[i], comments[i])
    }

    const result2 = await services.commentService.getComments({
      first: 10,
      after: result1[i-1].id
    })

    expect(result2).toBeDefined()
    expect(result2).toHaveLength(6)

    for (let j = 0; j < 6 && i < 16; ++j && ++i) {
      compareCommentFields(result2[j], comments[i])
    }
  })

  test("getComments, with filter", async () => {
    const result1 = await services.commentService.getComments({
      authorId: comments[0].authorId
    })

    expect(result1).toBeDefined()
    expect(result1).toHaveLength(4)

    const result2 = await services.commentService.getComments({
      poemId: comments[0].poemId
    })

    expect(result2).toBeDefined();
    expect(result2).toHaveLength(2)
  })

  test("getCommentsConnection", async () => {
    const result = await services.commentService.getCommentsConnection();
    const resultComments = result.edges.map((edge) => edge.node);

    expect(resultComments).toHaveLength(16)

    resultComments.forEach((comment, i) => {
      compareCommentFields(comment, comments[i])
    })
  })

  test("getCommentsConnection, with pagination", async () => {
    const result1 = await services.commentService.getCommentsConnection({first: 10});
    const resultComments1 = result1.edges.map((edge) => edge.node);

    expect(resultComments1).toHaveLength(10);

    let i = 0;
    for (i; i < 10; ++i) {
      compareCommentFields(comments[i], resultComments1[i]);
    }

    const result2 = await services.commentService.getCommentsConnection({ first: 10, after: result1.pageInfo.endCursor });
    const resultComments2 = result2.edges.map((edge) => edge.node);

    expect(resultComments2).toHaveLength(6);

    for (let j = 0; j < 6; ++j && ++i) {
      compareCommentFields(resultComments2[j], comments[i])
    }
  })

  test("getCommentsConnection, with filter", async () => {
    const result1 = await services.commentService.getCommentsConnection({ authorId: comments[0].authorId });
    expect(result1.edges).toHaveLength(4);

    const result2 = await services.commentService.getCommentsConnection({ poemId: comments[0].poemId });
    expect(result2.edges).toHaveLength(2)
  })

  test("createComment", async () => {
    const text = "testCommentText"
    const authorId = comments[0].authorId;
    const poemId = comments[0].poemId;
    const result = await services.commentService.createComment({
      text,
      authorId,
      poemId
    })

    expect(result).toBeDefined();

    const comment = await services.commentService.getComment({id: result.id})
    expect(comment.text).toStrictEqual(text)
    expect(comment.authorId).toStrictEqual(authorId)
    expect(comment.poemId).toStrictEqual(poemId)
    expect(comment).toStrictEqual(result)
  })

  test("createComment, with invalid input", async () => {
    await expect(services.commentService.createComment({authorId: testId, poemId: comments[0].poemId, text: ""})).rejects.toThrow()
  })

  test("removeComment", async () => {
    const result = await services.commentService.removeComment({id: comments[0].id})

    // make sure comment was removed
    await expect(services.commentService.getComment({id: result.id})).resolves.toBeNull()
    await expect(services.commentService.getComments()).resolves.toHaveLength(15)
  })

  test("removeComment, with id", async () => {
    await expect(services.commentService.removeComment({ id: testId })).rejects.toThrow();

    // make sure no comment was removed
    await expect(services.commentService.getComments()).resolves.toHaveLength(16)
  })
});
