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

    userById: (_, { id }, { dataSources }) => {
      return dataSources.poemAPI.getUserById(id);
    },

    users: (_, __, { dataSources }) => {
      return dataSources.poemAPI.getUsers();
    },

    userByName: (_, { username }, { dataSources }) => {
      return dataSources.poemAPI.getUserByName(username);
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

    createUser: (_, { input }, { dataSources }) => {
      try {
        return dataSources.poemAPI.createUser(input);
      } catch (err) {
        handlePrismaError(err, "createUser");
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

    updateUser: (_, { input }, { dataSources }) => {
      try {
        return dataSources.poemAPI.updateUser(input);
      } catch (err) {
        handlePrismaError(err, "updateUser");
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
    removeUser: (_, { id }, { dataSources }) => {
      try {
        return dataSources.poemAPI.removeUser(id);
      } catch (err) {
        handlePrismaError(err, "removeUser");
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
      const user = await dataSources.poemAPI.getUserWithPassword(username);

      if (!user || !argon2.verify(user.password, password)) {
        throw new Error("Incorrect username or password");
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        config.JWT_SECRET,
        { expiresIn: "4h" },
      );

      return { token, user };
    },
  },

  // TODO:
  // - add inCollection to poem
  // - might have to do similar thing for collection, comment, like, savedpoem
  Poem: {
    author: ({ authorId }, _, { dataSources }) => {
      return dataSources.poemAPI.getUserById(authorId);
    },
    inCollection: ({ collectionId }, _, { dataSources }) => {
      if (!collectionId) return null;
      return dataSources.poemAPI.getCollection(collectionId);
    },
  },
  Like: {
    author: ({ userId }, _, { dataSources }) => {
      return dataSources.poemAPI.getUserById(userId);
    },
    poem: ({ poemId }, _, { dataSources }) => {
      return dataSources.poemAPI.getPoem(poemId);
    },
  },
  Collection: {
    owner: ({ ownerId }, _, { dataSources }) => {
      return dataSources.poemAPI.getUserById(ownerId);
    },
  },
  SavedPoem: {
    user: ({ userId }, _, { dataSources }) => {
      return dataSources.poemAPI.getUserById(userId);
    },
    poem: ({ poemId }, _, { dataSources }) => {
      return dataSources.poemAPI.getPoem(poemId);
    },
  },
};
