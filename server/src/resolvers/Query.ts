import { GraphQLError } from "graphql";
import { Resolvers } from "../__generated__/types.js";
import { handlePrismaError } from "../utils/prisma-error-handler.js";

export const Query: Resolvers["Query"] = {
  poem: async (_, { id }, { services }) => {
    try {
      const poem = await services.poemService.getPoem({ id });
      return poem;
    } catch(err) {
      handlePrismaError({ err });
    }
  },

  poems: async (_, { first, after, filter }, { services }) => {
    try {
      const poems = await services.poemService.getPoemsConnection({ first, after, filter });
      return poems;
    } catch (err) {
      handlePrismaError({ err })
    }
  },

  authorById: async (_, { id }, { services }) => {
    try {
      const author = await services.authorService.getAuthorById({ id });
      return author;
    } catch (err) {
      handlePrismaError({ err });
    }
  },

  authors: async (
    _,
    { first, after, usernameContains },
    { services },
  ) => {
    try {
      const authors = await services.authorService.getAuthorsConnection({
        first,
        after,
        usernameContains,
      });
      return authors;
    } catch (err) {
      handlePrismaError({ err })
    }
  },

  comment: async (_, { id }, { services }) => {
    try {
      const comment = await  services.commentService.getComment({ id });
      return comment;
    } catch (err) {
      handlePrismaError({ err })
    }
  },

  comments: async (
    _,
    { first, after, authorId, poemId },
    { services },
  ) => {
    try {
      const comments = await services.commentService.getCommentsConnection({
        first,
        after,
        authorId,
        poemId,
      });
      return comments;
    } catch (err) {
      handlePrismaError({ err })
    }
  },

  authorByUsername: async (_, { username }, { services }) => {
    try {
      const author = await services.authorService.getAuthorByUsername({ username });
      return author;
    } catch (err) {
      handlePrismaError({ err });
    }
  },

  collection: async (_, { id }, { services }) => {
    try {
      const collection = await services.collectionService.getCollection({ id });
      return collection;
    } catch (err) {
      handlePrismaError({ err });
    }
  },

  collections: async (_, { first, after, filter }, { services }) => {
    try {
      const collections = await services.collectionService.getCollectionsConnection({ first, after, filter });
      return collections;
    } catch (err) {
      handlePrismaError({ err });
    }
  },

  like: async (_, { id }, { services }) => {
    try {
      const like = await services.likeService.getLike({ id });
      return like;
    } catch (err) {
      handlePrismaError({ err })
    }
  },

  likes: async (
    _,
    { first, after, authorId, poemId },
    { services },
  ) => {
    try {
      const likes = await services.likeService.getLikesConnection({ first, after, authorId, poemId });
      return likes;
    } catch (err) {
      handlePrismaError({ err })
    }
  },

  savedPoem: async (_, { id }, { services }) => {
    try {
      const savedPoem = await services.savedPoemService.getSavedPoem({ id });
      return savedPoem;
    } catch (err) {
      handlePrismaError({ err })
    }
  },

  savedPoems: async (
    _,
    { first, after, authorId, poemId },
    { services },
  ) => {
    try {
      const savedPoems = await services.savedPoemService.getSavedPoemsConnection({
        first,
        after,
        authorId,
        poemId,
      });
      return savedPoems;
    } catch (err) {
      handlePrismaError({ err })
    }
  },

  followedAuthor: async (_, { id }, { services }) => {
    try {
      const followedAuthor = await services.followedAuthorService.getFollowedAuthor({ id });
      return followedAuthor;
    } catch (err) {
      handlePrismaError({ err })
    }
  },

  followedAuthors: async (
    _,
    { first, after, followerId, followingId },
    { services },
  ) => {
    try {
      const followedAuthors = await services.followedAuthorService.getFollowedAuthorsConnection({
        first,
        after,
        followerId,
        followingId,
      });
      return followedAuthors;
    } catch (err) {
      handlePrismaError({ err });
    }
  },

  me: async (_, __, { user, services }) => {
    if (!user || user === null) {
      throw new GraphQLError("Not authenticated", { extensions: { code: "UNAUTHENTICATED" }})
    }

    try {
      const author = await services.authorService.getAuthorById({
        id: user.authorId,
        omitAuthVersion: false,
      });

      if (!(author.authVersion === user.authVersion)) {
        throw new GraphQLError("Token no longer valid", { extensions: { code: "UNAUTHENTICATED"}});
      }

      const { authVersion, ...authorWithoutAuthVersion } = author;
      return authorWithoutAuthVersion;
    } catch (err) {
      handlePrismaError({err})
    }
  },
};
