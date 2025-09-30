import { Resolvers } from "../__generated__/types.js";

export const Poem: Resolvers["Poem"] = {
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

  commentsCount: ({ id }, _, { dataSources }) => {
    return dataSources.poemAPI.getCommentsCount({ poemId: id });
  },

  likes: ({ id }, { limit, cursor }, { dataSources }) => {
    return dataSources.poemAPI.getLikes({
      limit,
      cursor,
      poemId: id,
    });
  },

  likesCount: ({ id }, _, { dataSources }) => {
    return dataSources.poemAPI.getLikesCount({ poemId: id });
  },

  savedBy: ({ id }, { limit, cursor }, { dataSources }) => {
    return dataSources.poemAPI.getSavedPoems({
      limit,
      cursor,
      poemId: id,
    });
  },

  savedByCount: ({ id }, _, { dataSources }) => {
    return dataSources.poemAPI.getSavedPoemsCount({ poemId: id });
  },
};
