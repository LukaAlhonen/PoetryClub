import { PrismaClient } from "../../../generated/prisma/index.js";
import {
  AuthorModel,
  CollectionModel,
  CommentModel,
  FollowedAuthorModel,
  LikeModel,
  PoemModel,
  SavedPoemModel,
} from "../../models.js";
import argon2 from "argon2";

export const seed = async ({ prisma }: { prisma: PrismaClient }) => {
  const poems: PoemModel[] = [];
  const collections: CollectionModel[] = [];
  const authors: AuthorModel[] = [];
  const comments: CommentModel[] = [];
  const likes: LikeModel[] = [];
  const savedPoems: SavedPoemModel[] = [];
  let followedAuthors: FollowedAuthorModel[] = [];
  await prisma.$transaction(async (tx) => {
    const pwdHash = await argon2.hash("password", { type: argon2.argon2id });
    // create authors
    for (let i = 1; i < 5; ++i) {
      const author = await tx.author.create({
        data: {
          username: `author${i}`,
          email: `author${i}@domain.com`,
          password: pwdHash,
        },
      });
      authors.push(author);
    }

    // create poems 2 poems per author and 1 collection
    // 2 poems per collection
    for (const author of authors) {
      const collection = await tx.collection.create({
        data: {
          title: `${author.username} collection`,
          authorId: author.id,
        },
      });
      collections.push(collection);

      for (let i = 0; i < 2; i++) {
        const poem = await tx.poem.create({
          data: {
            title: `${author.username} poem${i}`,
            text: `${author.username} poem${i} text`,
            authorId: author.id,
            collectionId: collection.id,
          },
        });
        poems.push(poem);
      }
    }

    // Create 2 comments per poem
    // await Promise.all(
    //   poems.flatMap((poem) =>
    //     Array.from({ length: 2 }).map((_, i) =>
    //       tx.comment.create({
    //         data: {
    //           poemId: poem.id,
    //           text: `comment ${i}`,
    //           authorId: poem.authorId,
    //         },
    //       }),
    //     ),
    //   ),
    // );

    for (const poem of poems) {
      for (let i = 0; i < 2; ++i) {
        const comment = await tx.comment.create({
          data: {
            poemId: poem.id,
            text: `comment ${i}`,
            authorId: poem.authorId,
          },
        });
        comments.push(comment);
      }
    }

    // Create 1 like per poem
    // await Promise.all(
    //   poems.flatMap(async (poem) => {
    //     await tx.like.create({
    //       data: {
    //         authorId: poem.authorId,
    //         poemId: poem.id,
    //       },
    //     });
    //   }),
    // );

    // Create 1 savedPoem per poem
    // await Promise.all(
    //   poems.flatMap(async (poem) => {
    //     await tx.savedPoem.create({
    //       data: {
    //         authorId: poem.authorId,
    //         poemId: poem.id,
    //       },
    //     });
    //   }),
    // );

    for (const poem of poems) {
      const like = await tx.like.create({
        data: {
          authorId: poem.authorId,
          poemId: poem.id,
        },
      });
      likes.push(like);

      const savedPoem = await tx.savedPoem.create({
        data: {
          poemId: poem.id,
          authorId: poem.authorId,
        },
      });
      savedPoems.push(savedPoem);
    }

    // make all authors follow each other
    followedAuthors = await tx.followedAuthor.createManyAndReturn({
      data: [
        { followerId: authors[0].id, followingId: authors[1].id },
        { followerId: authors[0].id, followingId: authors[2].id },
        { followerId: authors[0].id, followingId: authors[3].id },

        { followerId: authors[1].id, followingId: authors[0].id },
        { followerId: authors[1].id, followingId: authors[2].id },
        { followerId: authors[1].id, followingId: authors[3].id },

        { followerId: authors[2].id, followingId: authors[0].id },
        { followerId: authors[2].id, followingId: authors[1].id },
        { followerId: authors[2].id, followingId: authors[3].id },

        { followerId: authors[3].id, followingId: authors[0].id },
        { followerId: authors[3].id, followingId: authors[1].id },
        { followerId: authors[3].id, followingId: authors[2].id },
      ],
    });
  });

  return {
    poems,
    authors,
    collections,
    comments,
    likes,
    savedPoems,
    followedAuthors,
  };
};
