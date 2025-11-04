import { Resolvers } from "../__generated__/types.js";
import { handlePrismaError } from "../utils/prisma-error-handler.js";

export const Author: Resolvers["Author"] = {
  poems: async ({ id }, { first, after }, { services }) => {
    try {
      const poems = await services.poemService.getPoemsConnection({
        first,
        after,
        filter: {
          authorId: id,
        },
      });
      return poems;
    } catch (err) {
      handlePrismaError({err})
    }
  },

  savedPoems: async ({ id }, { first, after }, { services }) => {
    try {
      const savedPoems = await services.savedPoemService.getSavedPoemsConnection({
        first,
        after,
        authorId: id,
      });
      return savedPoems;
    } catch (err) {
      handlePrismaError({err})
    }
  },

  comments: async ({ id }, { first, after }, { services }) => {
    try {
      const comments = await services.commentService.getCommentsConnection({
        first,
        after,
        authorId: id,
      });
      return comments;
    } catch (err) {
      handlePrismaError({err})
    }
  },

  collections: async ({ id }, { first, after }, { services }) => {
    try {
      const collections = await services.collectionService.getCollectionsConnection({
        first,
        after,
        filter: {
          authorId: id,
        },
      });
      return collections;
    } catch (err) {
      handlePrismaError({err})
    }
  },

  likedPoems: async ({ id }, { first, after }, { services }) => {
    try {
      const likedPoems = await services.likeService.getLikesConnection({
        first,
        after,
        authorId: id,
      });
      return likedPoems;
    } catch (err) {
      handlePrismaError({err})
    }
  },

  followedBy: async ({ id }, { first, after }, { services }) => {
    try {
      const followedBy = await services.followedAuthorService.getFollowedAuthorsConnection({
        first,
        after,
        followingId: id,
      });
      return followedBy;
    } catch (err) {
      handlePrismaError({err})
    }
  },

  followedByCount: async ({ id }, _, { services }) => {
    try {
      const followedByCount = await services.authorService.getFollowedAuthorsCount({
        followingId: id,
      });
      return followedByCount;
    } catch (err) {
      handlePrismaError({err})
    }
  },

  following: async ({ id }, { first, after }, { services }) => {
    try {
      const following = await services.followedAuthorService.getFollowedAuthorsConnection({
        first,
        after,
        followerId: id,
      });
      return following;
    } catch (err) {
      handlePrismaError({err})
    }
  },

  followingCount: async ({ id }, _, { services }) => {
    try {
      const followingCount = await services.authorService.getFollowedAuthorsCount({
        followerId: id,
      });
      return followingCount;
    } catch (err) {
      handlePrismaError({err})
    }
  },

  followedByCurrentUser: async ({ id}, _, { user, services}) => {
    try {
      if (!user) return null;
      const followedAuthors = await services.followedAuthorService.getFollowedAuthors({ followerId: user.authorId, followingId: id });
      if (followedAuthors.length !== 1) return null
      return followedAuthors[0];
    } catch (err) {
      handlePrismaError({ err });
    }
  },
};
