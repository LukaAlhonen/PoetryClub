import { Resolvers } from "./types.js";
import { DateScalar } from "./scalars/date-scalar.js";
import { handlePrismaError } from "./utils/prisma-error-handler.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import config from "./config.js";

export const resolvers: Resolvers = {
  Date: DateScalar,
  Query: {
    poem: (_, { id }, { dataSources }) => {
      return dataSources.poemAPI.getPoem(id);
    },

    poems: (_, { cursor, limit, filter }, { dataSources }) => {
      return dataSources.poemAPI.getPoems(cursor, limit, filter);
    },

    authorById: (_, { id }, { dataSources }) => {
      return dataSources.poemAPI.getAuthorById(id);
    },

    authors: (_, __, { dataSources }) => {
      return dataSources.poemAPI.getAuthors();
    },

    authorByName: (_, { username }, { dataSources }) => {
      return dataSources.poemAPI.getAuthorByName(username);
    },

    collection: (_, { id }, { dataSources }) => {
      return dataSources.poemAPI.getCollection(id);
    },

    collections: (_, { id }, { dataSources }) => {
      return dataSources.poemAPI.getCollections(id);
    },
  },

  Mutation: {
    // Create
    createPoem: (_, { input }, { dataSources }) => {
      try {
        return dataSources.poemAPI.createPoem(input);
      } catch (err) {
        handlePrismaError(err, "createPoem");
      }
    },

    createAuthor: (_, { input }, { dataSources }) => {
      try {
        return dataSources.poemAPI.createAuthor(input);
      } catch (err) {
        handlePrismaError(err, "createAuthor");
      }
    },

    createComment: (_, { input }, { dataSources }) => {
      try {
        return dataSources.poemAPI.createComment(input);
      } catch (err) {
        handlePrismaError(err, "createComment");
      }
    },

    createCollection: (_, { input }, { dataSources }) => {
      try {
        return dataSources.poemAPI.createCollection(input);
      } catch (err) {
        handlePrismaError(err, "createCollection");
      }
    },

    createSavedPoem: (_, { input }, { dataSources }) => {
      try {
        return dataSources.poemAPI.createSavedPoem(input);
      } catch (err) {
        handlePrismaError(err, "createSavedPoem");
      }
    },

    createLike: (_, { input }, { dataSources }) => {
      try {
        return dataSources.poemAPI.createLike(input);
      } catch (err) {
        handlePrismaError(err, "createLike");
      }
    },

    // Update
    updatePoem: (_, { input }, { dataSources }) => {
      try {
        return dataSources.poemAPI.updatePoem(input);
      } catch (err) {
        handlePrismaError(err, "updatePoem");
      }
    },

    updateAuthor: (_, { input }, { dataSources }) => {
      try {
        return dataSources.poemAPI.updateAuthor(input);
      } catch (err) {
        handlePrismaError(err, "updateAuthor");
      }
    },

    updateCollection: (_, { input }, { dataSources }) => {
      try {
        return dataSources.poemAPI.updateCollection(input);
      } catch (err) {
        handlePrismaError(err, "updateCollection");
      }
    },

    // Remove
    removeAuthor: (_, { id }, { dataSources }) => {
      try {
        return dataSources.poemAPI.removeAuthor(id);
      } catch (err) {
        handlePrismaError(err, "removeAuthor");
      }
    },

    removePoem: (_, { id }, { dataSources }) => {
      try {
        return dataSources.poemAPI.removePoem(id);
      } catch (err) {
        handlePrismaError(err, "removePoem");
      }
    },

    removeComment: (_, { id }, { dataSources }) => {
      try {
        return dataSources.poemAPI.removeComment(id);
      } catch (err) {
        handlePrismaError(err, "removeComment");
      }
    },

    removeCollection: (_, { id }, { dataSources }) => {
      try {
        return dataSources.poemAPI.removeCollection(id);
      } catch (err) {
        handlePrismaError(err, "removeCollection");
      }
    },

    removeLike: (_, { id }, { dataSources }) => {
      try {
        return dataSources.poemAPI.removeLike(id);
      } catch (err) {
        handlePrismaError(err, "removeLike");
      }
    },

    removeSavedPoem: (_, { id }, { dataSources }) => {
      try {
        return dataSources.poemAPI.removeSavedPoem(id);
      } catch (err) {
        handlePrismaError(err, "removeSavedPoem");
      }
    },

    login: async (_, { username, password }, { dataSources }) => {
      const author = await dataSources.poemAPI.getAuthorWithPassword(username);

      if (!author || !argon2.verify(author.password, password)) {
        throw new Error("Incorrect username or password");
      }

      const token = jwt.sign(
        { userId: author.id, email: author.email },
        config.JWT_SECRET,
        { expiresIn: "4h" },
      );

      return { token, author };
    },
  },

  // TODO:
  Poem: {
    author: ({ authorId }, _, { dataSources }) => {
      return dataSources.poemAPI.getAuthorById(authorId);
    },
    inCollection: ({ collectionId }, _, { dataSources }) => {
      if (!collectionId) return null;
      return dataSources.poemAPI.getCollection(collectionId);
    },
  },
  Like: {
    author: ({ authorId }, _, { dataSources }) => {
      return dataSources.poemAPI.getAuthorById(authorId);
    },
    poem: ({ poemId }, _, { dataSources }) => {
      return dataSources.poemAPI.getPoem(poemId);
    },
  },
  Collection: {
    author: ({ authorId }, _, { dataSources }) => {
      return dataSources.poemAPI.getUserById(authorId);
    },
  },
  SavedPoem: {
    author: ({ authorId }, _, { dataSources }) => {
      return dataSources.poemAPI.getUserById(authorId);
    },
    poem: ({ poemId }, _, { dataSources }) => {
      return dataSources.poemAPI.getPoem(poemId);
    },
  },
};
