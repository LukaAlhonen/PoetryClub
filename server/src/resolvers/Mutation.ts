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
 * @param poemAPI - PoemAPI instance
 **/
const verifyUser = async ({
  user,
  authorService,
}: {
  user: MyJwtPayload;
  authorService: AuthorService;
}) => {
  if (!user) throw new GraphQLError("not authenticated", { extensions: { code: "UNAUTHENITCATED"}});
  const author = await authorService.getAuthorById({
    id: user.authorId,
    omitAuthVersion: false,
  });
  if (!author || author.authVersion !== user.authVersion) throw new GraphQLError("not authenticated", { extensions: { code: "UNAUTHENITCATED"}});
};

export const Mutation: Resolvers["Mutation"] = {
  // Create
  createPoem: async (_, { input }, { user, services }) => {
    await verifyUser({ user, authorService: services.authorService });

    // make sure collection belongs to author
    if (input.collectionId) {
      const collection = await services.collectionService.getCollection({
        id: input.collectionId,
      });
      if (collection.authorId !== user.authorId) {
        // throw new Error(`cannot add poem to collection`);
        throw new GraphQLError("Cannot add poem to collection", { extensions: { code: "UNAUTHORIZED"}})
      }
    }

    try {
      return services.poemService.createPoem({
        ...input,
        authorId: user.authorId,
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          if (err.meta) {
            console.log(err.meta)
          }
          throw new GraphQLError(`A Poem with the title ${input.title} already exists`, { extensions: { code: "BAD_USER_INPUT"}})
        } else {
          throw new GraphQLError("An unexpected error occured", { extensions: { code: "INTERNAL_SERVER_ERROR"}})
        }
      }
      else {
        throw new GraphQLError("An unexpected error occured", { extensions: { code: "INTERNAL_SERVER_ERROR"}})
      }
    }
  },

  createAuthor: (_, { input }, { services }) => {
    try {
      return services.authorService.createAuthor(input);
    } catch (err) {
      handlePrismaError(err, "createAuthor");
    }
  },

  createComment: async (_, { poemId, text }, { user, services }) => {
    await verifyUser({ user, authorService: services.authorService });

    try {
      return services.commentService.createComment({
        poemId,
        text,
        authorId: user.authorId,
      });
    } catch (err) {
      handlePrismaError(err, "createComment");
    }
  },

  createCollection: async (_, { title }, { user, services }) => {
    await verifyUser({ user, authorService: services.authorService });

    try {
      return services.collectionService.createCollection({
        title,
        authorId: user.authorId,
      });
    } catch (err) {
      handlePrismaError(err, "createCollection");
    }
  },

  createSavedPoem: async (_, { poemId }, { user, services }) => {
    await verifyUser({ user, authorService: services.authorService });

    try {
      return services.savedPoemService.createSavedPoem({
        poemId,
        authorId: user.authorId,
      });
    } catch (err) {
      handlePrismaError(err, "createSavedPoem");
    }
  },

  createLike: async (_, { poemId }, { user, services }) => {
    await verifyUser({ user, authorService: services.authorService });

    try {
      return services.likeService.createLike({
        poemId,
        authorId: user.authorId,
      });
    } catch (err) {
      handlePrismaError(err, "createLike");
    }
  },

  createFollowedAuthor: async (_, { followingId }, { user, services }) => {
    await verifyUser({ user, authorService: services.authorService });

    try {
      return services.followedAuthorService.createFollowedAuthor({
        authorId: user.authorId,
        followingId,
      });
    } catch (err) {
      handlePrismaError(err, "createFollowedAuthor");
    }
  },

  // Update
  updatePoem: async (_, { input }, { user, services }) => {
    await verifyUser({ user, authorService: services.authorService });

    // make sure collection belongs to author
    if (input.collectionId) {
      const collection = await services.collectionService.getCollection({
        id: input.collectionId,
      });
      if (collection.authorId !== user.authorId) {
        throw new Error(`cannot add poem to collection`);
      }
    }

    const poem = await services.poemService.getPoem({ id: input.poemId });

    if (poem.authorId !== user.authorId) {
      throw new Error("not authorised");
    }

    try {
      return services.poemService.updatePoem(input);
    } catch (err) {
      handlePrismaError(err, "updatePoem");
    }
  },

  updateAuthor: async (_, { input }, { user, services }) => {
    await verifyUser({ user, authorService: services.authorService });

    const authVersion = randomUUID();

    try {
      return services.authorService.updateAuthor({
        authorId: user.authorId,
        authVersion,
        ...input,
      });
    } catch (err) {
      handlePrismaError(err, "updateAuthor");
    }
  },

  updateCollection: async (_, { input }, { user, services }) => {
    await verifyUser({ user, authorService: services.authorService });

    const collection = await services.collectionService.getCollection({
      id: input.id,
    });

    if (collection.authorId !== user.authorId) {
      throw new Error("not authenticated");
    }

    try {
      return services.collectionService.updateCollection(input);
    } catch (err) {
      handlePrismaError(err, "updateCollection");
    }
  },

  // Remove
  removeAuthor: async (_, __, { user, services }) => {
    await verifyUser({ user, authorService: services.authorService });

    try {
      return services.authorService.removeAuthor({ id: user.authorId });
    } catch (err) {
      handlePrismaError(err, "removeAuthor");
    }
  },

  removePoem: async (_, { poemId }, { user, services }) => {
    await verifyUser({ user, authorService: services.authorService });

    try {
      const poem = await services.poemService.getPoem({ id: poemId });

      if (poem.authorId !== user.authorId) {
        throw new Error("not authorised");
      }
    } catch (err) {
      handlePrismaError(err, "removePoem");
    }

    try {
      return services.poemService.removePoem({ id: poemId });
    } catch (err) {
      handlePrismaError(err, "removePoem");
    }
  },

  removeComment: async (_, { commentId }, { user, services }) => {
    await verifyUser({ user, authorService: services.authorService });

    try {
      const comment = await services.commentService.getComment({
        id: commentId,
      });

      if (comment.authorId !== user.authorId) {
        throw new Error("not authorised");
      }
    } catch (err) {
      handlePrismaError(err, "removeComment");
    }

    try {
      return services.commentService.removeComment({ id: commentId });
    } catch (err) {
      handlePrismaError(err, "removeComment");
    }
  },

  removeCollection: async (_, { collectionId }, { user, services }) => {
    await verifyUser({ user, authorService: services.authorService });

    try {
      const collection = await services.collectionService.getCollection({
        id: collectionId,
      });

      if (collection.authorId !== user.authorId) {
        throw new Error("not authorised");
      }
    } catch (err) {
      handlePrismaError(err, "removeCollection");
    }

    try {
      return services.collectionService.removeCollection({ id: collectionId });
    } catch (err) {
      handlePrismaError(err, "removeCollection");
    }
  },

  removeLike: async (_, { likeId }, { user, services }) => {
    await verifyUser({ user, authorService: services.authorService });

    try {
      const like = await services.likeService.getLike({ id: likeId });

      if (like.authorId !== user.authorId) {
        throw new Error("not authorised");
      }
    } catch (err) {
      handlePrismaError(err, "removeLike");
    }

    try {
      return services.likeService.removeLike({ id: likeId });
    } catch (err) {
      handlePrismaError(err, "removeLike");
    }
  },

  removeSavedPoem: async (_, { savedPoemId }, { user, services }) => {
    await verifyUser({ user, authorService: services.authorService });

    try {
      const savedPoem = await services.savedPoemService.getSavedPoem({
        id: savedPoemId,
      });

      if (savedPoem.authorId !== user.authorId) {
        throw new Error("not authorised");
      }
    } catch (err) {
      handlePrismaError(err, "removeSavedPoem");
    }

    try {
      return services.savedPoemService.removeSavedPoem({ id: savedPoemId });
    } catch (err) {
      handlePrismaError(err, "removeSavedPoem");
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
        throw new Error("not authorised");
      }
    } catch (err) {
      handlePrismaError(err, "removeFollowedAuthor");
    }

    try {
      return services.followedAuthorService.removeFollowedAuthor({
        id: followedAuthorId,
      });
    } catch (err) {
      handlePrismaError(err, "removeFollowedAuthor");
    }
  },

  incrementPoemViews: async (_, { poemId }, { services }) => {
    try {
      return services.poemService.incrementPoemViews({ poemId });
    } catch (err) {
      handlePrismaError(err, "incrementPoemViews");
    }
  },

  // auth
  login: async (_, { username, password }, { services }) => {
    const author = await services.authorService.getAuthorByUsername({
      username,
      omitPassword: false,
      omitAuthVersion: false,
    });

    if (!author) {
      throw new Error("Incorrect username or password");
    }

    const passwordIsValid = await argon2.verify(author.password, password);

    if (!passwordIsValid) {
      throw new Error("Incorrect username or password");
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
  },

  signup: async (_, { input }, { services }) => {
    try {
      return services.authorService.createAuthor(input);
    } catch (err) {
      handlePrismaError(err, "createAuthor");
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
