import { Resolvers } from "../__generated__/types.js";
import { handlePrismaError } from "../utils/prisma-error-handler.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import config from "../config.js";
import { MyJwtPayload } from "../types/auth.js";
import { AuthorService } from "../services/author.service.js";
import { randomUUID } from "node:crypto";
import { GraphQLError } from "graphql";
import { Prisma } from "../../generated/prisma/index.js";

/**
 * Verifies user is logged in and auth token is valid
 * @param user - context
 * @param authorService - AuthorService instance
 **/
const verifyUser = async ({
  user,
  authorService,
}: {
  user: MyJwtPayload;
  authorService: AuthorService;
}) => {
  if (!user)
    throw new GraphQLError("not authenticated", {
      extensions: { code: "UNAUTHENITCATED" },
    });
  const author = await authorService.getAuthorById({
    id: user.authorId,
    omitAuthVersion: false,
  });
  if (!author || author.authVersion !== user.authVersion) {
    throw new GraphQLError("not authenticated", {
      extensions: { code: "UNAUTHENITCATED" },
    });
  }
};

export const Mutation: Resolvers["Mutation"] = {
  // Create
  createPoem: async (_, { input }, { user, services }) => {
    await verifyUser({ user, authorService: services.authorService });

    try {
      // make sure collection belongs to author
      if (input.collectionId) {
        const collection = await services.collectionService.getCollection({
          id: input.collectionId,
        });
        if (collection.authorId !== user.authorId) {
          // throw new Error(`cannot add poem to collection`);
          throw new GraphQLError("Cannot add poem to collection", {
            extensions: { code: "UNAUTHORIZED" },
          });
        }
      }

      return services.poemService.createPoem({
        ...input,
        authorId: user.authorId,
      });
    } catch (err) {
      handlePrismaError({ err })
    }
  },

  createAuthor: async (_, { input }, { services }) => {
    try {
      const author = await services.authorService.createAuthor(input);
      return author;
    } catch (err) {
      handlePrismaError({err});
    }
  },

  createComment: async (_, { poemId, text }, { user, services }) => {
    await verifyUser({ user, authorService: services.authorService });

    try {
      const comment = await services.commentService.createComment({
        poemId,
        text,
        authorId: user.authorId,
      });
      return comment;
    } catch (err) {
      handlePrismaError({err});
    }
  },

  createCollection: async (_, { title }, { user, services }) => {
    await verifyUser({ user, authorService: services.authorService });

    try {
      const collection = await services.collectionService.createCollection({
        title,
        authorId: user.authorId,
      });
      return collection;
    } catch (err) {
      handlePrismaError({err});
    }
  },

  createSavedPoem: async (_, { poemId }, { user, services }) => {
    await verifyUser({ user, authorService: services.authorService });

    try {
      const savedPoem = await services.savedPoemService.createSavedPoem({
        poemId,
        authorId: user.authorId,
      });
      return savedPoem;
    } catch (err) {
      handlePrismaError({err});
    }
  },

  createLike: async (_, { poemId }, { user, services }) => {
    await verifyUser({ user, authorService: services.authorService });

    try {
      const like = await services.likeService.createLike({
        poemId,
        authorId: user.authorId,
      });
      return like
    } catch (err) {
      handlePrismaError({err});
    }
  },

  createFollowedAuthor: async (_, { followingId }, { user, services }) => {
    await verifyUser({ user, authorService: services.authorService });

    try {
      const followedAuthor = await services.followedAuthorService.createFollowedAuthor({
        authorId: user.authorId,
        followingId,
      });
      return followedAuthor;
    } catch (err) {
      handlePrismaError({err});
    }
  },

  // Update
  updatePoem: async (_, { input }, { user, services }) => {
    await verifyUser({ user, authorService: services.authorService });

    try {
      // make sure collection belongs to author
      if (input.collectionId) {
        const collection = await services.collectionService.getCollection({
          id: input.collectionId,
        });
        if (collection.authorId !== user.authorId) {
          throw new GraphQLError(`cannot add poem to collection`, { extensions: { code: "BAD_USER_INPUT" } });
        }
      }

      const poem = await services.poemService.getPoem({ id: input.poemId });

      if (poem.authorId !== user.authorId) {
        throw new GraphQLError("Not authorized", { extensions: { code: "UNAUHTORIZED" } });
      }

      const updatedPoem = await services.poemService.updatePoem(input);
      return updatedPoem;
    } catch (err) {
      handlePrismaError({err});
    }
  },

  updateAuthor: async (_, { input }, { user, services }) => {
    await verifyUser({ user, authorService: services.authorService });

    const authVersion = randomUUID();

    try {
      const updatedAuthor = await services.authorService.updateAuthor({
        authorId: user.authorId,
        authVersion,
        ...input,
      });
      return updatedAuthor;
    } catch (err) {
      handlePrismaError({err});
    }
  },

  updateCollection: async (_, { input }, { user, services }) => {
    await verifyUser({ user, authorService: services.authorService });

    try {
      const collection = await services.collectionService.getCollection({
        id: input.id,
      });

      if (collection.authorId !== user.authorId) {
        throw new GraphQLError("Not authorized", { extensions: { code: "UNAUTHORIZED" } });
      }

      const updatedCollection = await services.collectionService.updateCollection(input);
      return updatedCollection;
    } catch (err) {
      handlePrismaError({err});
    }
  },

  // Remove
  removeAuthor: async (_, __, { user, services }) => {
    await verifyUser({ user, authorService: services.authorService });

    try {
      const removedAuthor = await services.authorService.removeAuthor({ id: user.authorId });
      return removedAuthor;
    } catch (err) {
      handlePrismaError({err});
    }
  },

  removePoem: async (_, { poemId }, { user, services }) => {
    await verifyUser({ user, authorService: services.authorService });

    try {
      const poem = await services.poemService.getPoem({ id: poemId });

      if (poem.authorId !== user.authorId) {
        throw new GraphQLError("Not authorized", { extensions: { code: "UNAUTHORIZED" } });
      }

      const removedPoem = await services.poemService.removePoem({ id: poemId });
      return removedPoem;
    } catch (err) {
      handlePrismaError({err});
    }
  },

  removeComment: async (_, { commentId }, { user, services }) => {
    await verifyUser({ user, authorService: services.authorService });

    try {
      const comment = await services.commentService.getComment({
        id: commentId,
      });

      if (comment.authorId !== user.authorId) {
        throw new GraphQLError("Not authorized", { extensions: { code: "UNAUTHORIZED" } });
      }

      const removedComment = await services.commentService.removeComment({ id: commentId });
      return removedComment;
    } catch (err) {
      handlePrismaError({err});
    }
  },

  removeCollection: async (_, { collectionId }, { user, services }) => {
    await verifyUser({ user, authorService: services.authorService });

    try {
      const collection = await services.collectionService.getCollection({
        id: collectionId,
      });

      if (collection.authorId !== user.authorId) {
        throw new GraphQLError("Not authorized", { extensions: { code: "UNAUTHORIZED" } });
      }

      const removedCollection = await services.collectionService.removeCollection({ id: collectionId });
      return removedCollection;
    } catch (err) {
      handlePrismaError({err});
    }
  },

  removeLike: async (_, { likeId }, { user, services }) => {
    await verifyUser({ user, authorService: services.authorService });

    try {
      const like = await services.likeService.getLike({ id: likeId });

      if (like.authorId !== user.authorId) {
        throw new GraphQLError("Not authorized", { extensions: { code: "UNAUTHORIZED" } });
      }

      const removedLike = await services.likeService.removeLike({ id: likeId });
      return removedLike;
    } catch (err) {
      handlePrismaError({err});
    }
  },

  removeSavedPoem: async (_, { savedPoemId }, { user, services }) => {
    await verifyUser({ user, authorService: services.authorService });

    try {
      const savedPoem = await services.savedPoemService.getSavedPoem({
        id: savedPoemId,
      });

      if (savedPoem.authorId !== user.authorId) {
        throw new GraphQLError("Not authorized", { extensions: { code: "UNAUTHORIZED" } });
      }

      const removedSavedPoem = await services.savedPoemService.removeSavedPoem({ id: savedPoemId });
      return removedSavedPoem;
    } catch (err) {
      handlePrismaError({err});
    }
  },

  removeFollowedAuthor: async (_, { followedAuthorId }, { user, services }) => {
    await verifyUser({ user, authorService: services.authorService });

    try {
      const followedAuthor =
        await services.followedAuthorService.getFollowedAuthor({
          id: followedAuthorId,
        });

      if (followedAuthor.followerId !== user.authorId) {
        throw new GraphQLError("Not authorized", { extensions: { code: "UNAUTHORIZED" } });
      }

      const removedFollowedAuthor = await services.followedAuthorService.removeFollowedAuthor({
        id: followedAuthorId,
      });
      return removedFollowedAuthor;
    } catch (err) {
      handlePrismaError({err});
    }
  },

  incrementPoemViews: async (_, { poemId }, { services }) => {
    try {
      const poem = await services.poemService.incrementPoemViews({ poemId });
      return poem;
    } catch (err) {
      handlePrismaError({err});
    }
  },

  // auth
  login: async (_, { username, password }, { services }) => {
    try {
      const author = await services.authorService.getAuthorByUsername({
        username,
        omitPassword: false,
        omitAuthVersion: false,
      });

      if (!author) {
        throw new GraphQLError("Incorrect username or password", { extensions: { code: "BAD_USER_INPUT" } });
      }

      const passwordIsValid = await argon2.verify(author.password, password);

      if (!passwordIsValid) {
        throw new GraphQLError("Incorrect username or password", { extensions: { code: "BAD_USER_INPUT" } });
      }

      const accessToken = jwt.sign(
        {
          authorId: author.id,
          email: author.email,
          authVersion: author.authVersion,
        },
        config.JWT_SECRET,
        { expiresIn: "1d" },
      );

      return { token: accessToken, author };
    } catch (err) {
      handlePrismaError({ err })
    }
  },

  signup: async (_, { input }, { services }) => {
    try {
      const newAuthor = await services.authorService.createAuthor(input);
      return newAuthor;
    } catch (err) {
      handlePrismaError({ err });
    }
  },

  logout: async (_, __, { user, services }) => {
    if (!user) {
      return true;
    }

    // invalidate old auth verison
    const authVersion = randomUUID();

    await services.authorService.updateAuthor({
      authorId: user.authorId,
      authVersion,
    });

    return true;
  },
};
