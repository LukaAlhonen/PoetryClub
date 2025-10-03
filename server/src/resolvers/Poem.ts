import { Resolvers } from "../__generated__/types.js";

export const Poem: Resolvers["Poem"] = {
  author: ({ authorId }, _, { dataSources, services }) => {
    return services.authorService.getAuthorById({
      id: authorId,
    });
  },

  inCollection: ({ collectionId }, _, { dataSources, services }) => {
    if (!collectionId) return null;
    return services.collectionService.getCollection({ id: collectionId });
  },

  comments: ({ id }, { limit, cursor }, { dataSources, services }) => {
    return services.commentService.getComments({
      poemId: id,
      limit,
      cursor,
    });
  },

  commentsCount: ({ id }, _, { dataSources, services }) => {
    return services.poemService.getCommentsCount({ poemId: id });
  },

  likes: ({ id }, { limit, cursor }, { dataSources, services }) => {
    return services.likeService.getLikes({
      limit,
      cursor,
      poemId: id,
    });
  },

  likesCount: ({ id }, _, { dataSources, services }) => {
    return services.poemService.getLikesCount({ poemId: id });
  },

  savedBy: ({ id }, { limit, cursor }, { dataSources, services }) => {
    return services.savedPoemService.getSavedPoems({
      limit,
      cursor,
      poemId: id,
    });
  },

  savedByCount: ({ id }, _, { dataSources, services }) => {
    return services.poemService.getSavedPoemsCount({ poemId: id });
  },
};
