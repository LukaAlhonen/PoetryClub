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
      return dataSources.poemAPI.getPoem({ id });
    },

    poems: (_, { limit, cursor, filter }, { dataSources }) => {
      return dataSources.poemAPI.getPoems({ cursor, limit, filter });
    },

    authorById: (_, { id }, { dataSources }) => {
      return dataSources.poemAPI.getAuthorById({ id });
    },

    authors: (_, { limit, cursor, usernameContains }, { dataSources }) => {
      return dataSources.poemAPI.getAuthors({
        limit,
        cursor,
        usernameContains,
      });
    },

    authorByUsername: (_, { username }, { dataSources }) => {
      return dataSources.poemAPI.getAuthorByUsername({
        username,
      });
    },

    collection: (_, { id }, { dataSources }) => {
      return dataSources.poemAPI.getCollection({ id });
    },

    collections: (_, { limit, cursor, filter }, { dataSources }) => {
      return dataSources.poemAPI.getCollections({ limit, cursor, filter });
    },

    like: (_, { id }, { dataSources }) => {
      return dataSources.poemAPI.getLike({ id });
    },

    likes: (_, { limit, cursor, authorId, poemId }, { dataSources }) => {
      return dataSources.poemAPI.getLikes({ limit, cursor, authorId, poemId });
    },

    savedPoem: (_, { id }, { dataSources }) => {
      return dataSources.poemAPI.getSavedPoem({ id });
    },

    savedPoems: (_, { limit, cursor, authorId, poemId }, { dataSources }) => {
      return dataSources.poemAPI.getSavedPoems({
        limit,
        cursor,
        authorId,
        poemId,
      });
    },

    followedAuthor: (_, { id }, { dataSources }) => {
      return dataSources.poemAPI.getFollowedAuthor({ id });
    },

    followedAuthors: (
      _,
      { limit, cursor, followerId, followingId },
      { dataSources },
    ) => {
      return dataSources.poemAPI.getFollowedAuthors({
        limit,
        cursor,
        followerId,
        followingId,
      });
    },
  },

  Mutation: {
    // Create
    createPoem: (_, { input }, { user, dataSources }) => {
      if (!user || user === null) {
        throw new Error("not authenticated");
      }
      console.log(user);
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

    createComment: (_, { input }, { user, dataSources }) => {
      if (!user || user === null || user.authorId !== input.authorId) {
        throw new Error("not authenticated");
      }

      try {
        return dataSources.poemAPI.createComment(input);
      } catch (err) {
        handlePrismaError(err, "createComment");
      }
    },

    createCollection: (_, { input }, { user, dataSources }) => {
      if (!user || user === null || user.authorId !== input.authorId) {
        throw new Error("not authenticated");
      }
      try {
        return dataSources.poemAPI.createCollection(input);
      } catch (err) {
        handlePrismaError(err, "createCollection");
      }
    },

    createSavedPoem: (_, { input }, { user, dataSources }) => {
      if (!user || user === null || user.authorId !== input.authorId) {
        throw new Error("not authenticated");
      }
      try {
        return dataSources.poemAPI.createSavedPoem(input);
      } catch (err) {
        handlePrismaError(err, "createSavedPoem");
      }
    },

    createLike: (_, { input }, { user, dataSources }) => {
      if (!user || user === null || user.authorId !== input.authorId) {
        throw new Error("not authenticated");
      }
      try {
        return dataSources.poemAPI.createLike(input);
      } catch (err) {
        handlePrismaError(err, "createLike");
      }
    },

    createFollowedAuthor: (_, { input }, { user, dataSources }) => {
      if (!user || user === null || user.authorId !== input.followerId) {
        throw new Error("not authenticated");
      }

      try {
        return dataSources.poemAPI.createFollowedAuthor(input);
      } catch (err) {
        handlePrismaError(err, "createFollowedAuthor");
      }
    },

    // Update
    updatePoem: (_, { input }, { user, dataSources }) => {
      if (!user || user === null || user.authorId !== input.authorId) {
        throw new Error("not authenticated");
      }
      try {
        return dataSources.poemAPI.updatePoem(input);
      } catch (err) {
        handlePrismaError(err, "updatePoem");
      }
    },

    updateAuthor: (_, { input }, { user, dataSources }) => {
      if (!user || user === null || user.authorId !== input.authorId) {
        throw new Error("not authenticated");
      }
      try {
        return dataSources.poemAPI.updateAuthor(input);
      } catch (err) {
        handlePrismaError(err, "updateAuthor");
      }
    },

    updateCollection: (_, { input }, { user, dataSources }) => {
      if (!user || user === null || user.authorId !== input.authorId) {
        throw new Error("not authenticated");
      }
      try {
        return dataSources.poemAPI.updateCollection(input);
      } catch (err) {
        handlePrismaError(err, "updateCollection");
      }
    },

    // Remove
    removeAuthor: (_, { id }, { user, dataSources }) => {
      if (!user || user === null || user.authorId !== id) {
        throw new Error("not authenticated");
      }
      try {
        return dataSources.poemAPI.removeAuthor({ id });
      } catch (err) {
        handlePrismaError(err, "removeAuthor");
      }
    },

    removePoem: (_, { input }, { user, dataSources }) => {
      if (!user || user === null || user.authorId !== input.authorId) {
        throw new Error("not authenticated");
      }
      try {
        return dataSources.poemAPI.removePoem({ id: input.poemId });
      } catch (err) {
        handlePrismaError(err, "removePoem");
      }
    },

    removeComment: (_, { input }, { user, dataSources }) => {
      if (!user || user === null || user.authorId !== input.authorId) {
        throw new Error("not authenticated");
      }
      try {
        return dataSources.poemAPI.removeComment({ id: input.commentId });
      } catch (err) {
        handlePrismaError(err, "removeComment");
      }
    },

    removeCollection: (_, { input }, { user, dataSources }) => {
      if (!user || user === null || user.authorId !== input.authorId) {
        throw new Error("not authenticated");
      }
      try {
        return dataSources.poemAPI.removeCollection({ id: input.collectionId });
      } catch (err) {
        handlePrismaError(err, "removeCollection");
      }
    },

    removeLike: (_, { input }, { user, dataSources }) => {
      if (!user || user === null || user.authorId !== input.authorId) {
        throw new Error("not authenticated");
      }
      try {
        return dataSources.poemAPI.removeLike({ id: input.likeId });
      } catch (err) {
        handlePrismaError(err, "removeLike");
      }
    },

    removeSavedPoem: (_, { input }, { user, dataSources }) => {
      if (!user || user === null || user.authorId !== input.authorId) {
        throw new Error("not authenticated");
      }
      try {
        return dataSources.poemAPI.removeSavedPoem({ id: input.savedPoemId });
      } catch (err) {
        handlePrismaError(err, "removeSavedPoem");
      }
    },

    login: async (_, { username, password }, { dataSources }) => {
      const author = await dataSources.poemAPI.getAuthorByUsername({
        username,
        omitPassword: false,
      });

      if (!author || !argon2.verify(author.password, password)) {
        throw new Error("Incorrect username or password");
      }

      const token = jwt.sign(
        { authorId: author.id, email: author.email },
        config.JWT_SECRET,
        { expiresIn: "4h" },
      );

      return { token, author };
    },
  },

  Author: {
    poems: ({ id }, { limit, cursor }, { dataSources }) => {
      return dataSources.poemAPI.getPoems({
        limit,
        cursor,
        filter: {
          authorId: id,
        },
      });
    },

    savedPoems: ({ id }, { limit, cursor }, { dataSources }) => {
      return dataSources.poemAPI.getSavedPoems({
        limit,
        cursor,
        authorId: id,
      });
    },

    comments: ({ id }, { limit, cursor }, { dataSources }) => {
      return dataSources.poemAPI.getComments({
        limit,
        cursor,
        authorId: id,
      });
    },

    collections: ({ id }, { limit, cursor }, { dataSources }) => {
      return dataSources.poemAPI.getCollections({
        limit,
        cursor,
        filter: {
          authorId: id,
        },
      });
    },

    likedPoems: ({ id }, { limit, cursor }, { dataSources }) => {
      return dataSources.poemAPI.getLikes({
        limit,
        cursor,
        authorId: id,
      });
    },
  },

  Poem: {
    author: ({ authorId }, _, { dataSources }) => {
      return dataSources.poemAPI.getAuthorById({
        id: authorId,
      });
    },

    inCollection: ({ collectionId }, _, { dataSources }) => {
      if (!collectionId) return null;
      return dataSources.poemAPI.getCollection({ id: collectionId });
    },

    comments: ({ id }, { limit, cursor }, { dataSources }) => {
      return dataSources.poemAPI.getComments({
        poemId: id,
        limit,
        cursor,
      });
    },

    likes: ({ id }, { limit, cursor }, { dataSources }) => {
      return dataSources.poemAPI.getLikes({
        limit,
        cursor,
        poemId: id,
      });
    },

    savedBy: ({ id }, { limit, cursor }, { dataSources }) => {
      return dataSources.poemAPI.getSavedPoems({
        limit,
        cursor,
        poemId: id,
      });
    },
  },

  Like: {
    author: ({ authorId }, _, { dataSources }) => {
      return dataSources.poemAPI.getAuthorById({
        id: authorId,
      });
    },

    poem: ({ poemId }, _, { dataSources }) => {
      return dataSources.poemAPI.getPoem({ id: poemId });
    },
  },

  Collection: {
    author: ({ authorId }, _, { dataSources }) => {
      return dataSources.poemAPI.getAuthorById({
        id: authorId,
      });
    },

    poems: ({ id }, { limit, cursor }, { dataSources }) => {
      return dataSources.poemAPI.getPoems({
        limit,
        cursor,
        filter: {
          collectionId: id,
        },
      });
    },
  },

  SavedPoem: {
    author: ({ authorId }, _, { dataSources }) => {
      return dataSources.poemAPI.getAuthorById({
        id: authorId,
      });
    },

    poem: ({ poemId }, _, { dataSources }) => {
      return dataSources.poemAPI.getPoem({ id: poemId });
    },
  },

  FollowedAuthor: {
    follower: ({ followerId }, _, { dataSources }) => {
      return dataSources.poemAPI.getAuthorById({
        id: followerId,
      });
    },

    following: ({ followingId }, _, { dataSources }) => {
      return dataSources.poemAPI.getAuthorById({
        id: followingId,
      });
    },
  },
};
