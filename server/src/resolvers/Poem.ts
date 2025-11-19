import { Resolvers } from "../__generated__/types.js";
import { handlePrismaError } from "../utils/prisma-error-handler.js";

export const Poem: Resolvers["Poem"] = {
  author: async ({ authorId }, _, { services }) => {
    try {
      const author = await services.authorService.getAuthorById({
        id: authorId,
      });
      return author;
    } catch (err) {
      handlePrismaError({err})
    }
  },

  inCollection: async ({ collectionId }, _, { services }) => {
    try {
      if (!collectionId) return null;
      const inCollection = await services.collectionService.getCollection({ id: collectionId });
      return inCollection;
    } catch (err) {
      handlePrismaError({err})
    }
  },

  comments: async ({ id }, { first, after }, { services }) => {
    try {
      const comments = await services.commentService.getCommentsConnection({
        poemId: id,
        first,
        after,
      });
      return comments;
    } catch (err) {
      handlePrismaError({ err });
    }
  },

  commentsCount: async ({ id }, _, { services }) => {
    try {
      const commentsCount = await services.poemService.getCommentsCount({ poemId: id });
      return commentsCount;
    } catch (err) {
      handlePrismaError({err})
    }
  },

  likes: async ({ id }, { first, after }, { services }) => {
    try {
      const likes = await services.likeService.getLikesConnection({
        first,
        after,
        poemId: id,
      });
      return likes;
    } catch (err) {
      handlePrismaError({err})
    }
  },

  likesCount: async ({ id }, _, { services }) => {
    try {
      const likesCount = await services.poemService.getLikesCount({ poemId: id });
      return likesCount;
    } catch (err) {
      handlePrismaError({ err });
    }
  },

  savedBy: async ({ id }, { first, after }, { services }) => {
    try {
      const savedBy = await services.savedPoemService.getSavedPoemsConnection({
        first,
        after,
        poemId: id,
      });
      return savedBy;
    } catch (err) {
      handlePrismaError({ err });
    }
  },

  savedByCount: async ({ id }, _, { services }) => {
    try {
      const savedByCount = await services.poemService.getSavedPoemsCount({ poemId: id });
      return savedByCount;
    } catch (err) {
      handlePrismaError({ err });
    }
  },

  likedByCurrentUser: async ({ id }, _, { user, services }) => {
    try {
      if (!user) return null;
      const likes = await services.likeService.getLikes({ poemId: id, authorId: user.authorId });
      if (likes.length !== 1) return null;
      return likes[0];
    } catch (err) {
      handlePrismaError({err})
    }
  },

  savedByCurrentUser: async ({ id }, _, { user, services }) => {
    try {
      if (!user) return null;
      const savedPoems = await services.savedPoemService.getSavedPoems({ poemId: id, authorId: user.authorId });
      if (savedPoems.length !== 1) return null;
      return savedPoems[0]
    } catch (err) {
      handlePrismaError({err})
    }
  }
};
