import { Resolvers } from "../__generated__/types.js";

export const Poem: Resolvers["Poem"] = {
  author: ({ authorId }, _, { services }) => {
    return services.authorService.getAuthorById({
      id: authorId,
    });
  },

  inCollection: ({ collectionId }, _, { services }) => {
    if (!collectionId) return null;
    return services.collectionService.getCollection({ id: collectionId });
  },

  comments: ({ id }, { first, after }, { services }) => {
    return services.commentService.getCommentsConnection({
      poemId: id,
      first,
      after,
    });
  },

  commentsCount: ({ id }, _, { services }) => {
    return services.poemService.getCommentsCount({ poemId: id });
  },

  likes: ({ id }, { first, after, authorId }, { services }) => {
    return services.likeService.getLikesConnection({
      first,
      after,
      poemId: id,
      authorId
    });
  },

  likesCount: ({ id }, _, { services }) => {
    return services.poemService.getLikesCount({ poemId: id });
  },

  savedBy: ({ id }, { first, after }, { services }) => {
    return services.savedPoemService.getSavedPoemsConnection({
      first,
      after,
      poemId: id,
    });
  },

  savedByCount: ({ id }, _, { services }) => {
    return services.poemService.getSavedPoemsCount({ poemId: id });
  },
};
