import { Resolvers } from "../__generated__/types.js";

export const Author: Resolvers["Author"] = {
  poems: ({ id }, { first, after }, { services }) => {
    return services.poemService.getPoemsConnection({
      first,
      after,
      filter: {
        authorId: id,
      },
    });
  },

  savedPoems: ({ id }, { first, after }, { services }) => {
    return services.savedPoemService.getSavedPoemsConnection({
      first,
      after,
      authorId: id,
    });
  },

  comments: ({ id }, { first, after }, { services }) => {
    return services.commentService.getCommentsConnection({
      first,
      after,
      authorId: id,
    });
  },

  collections: ({ id }, { first, after }, { services }) => {
    return services.collectionService.getCollectionsConnection({
      first,
      after,
      filter: {
        authorId: id,
      },
    });
  },

  likedPoems: ({ id }, { first, after }, { services }) => {
    return services.likeService.getLikesConnection({
      first,
      after,
      authorId: id,
    });
  },

  followedBy: ({ id }, { first, after }, { services }) => {
    return services.followedAuthorService.getFollowedAuthorsConnection({
      first,
      after,
      followingId: id,
    });
  },

  followedByCount: ({ id }, _, { services }) => {
    return services.authorService.getFollowedAuthorsCount({
      followingId: id,
    });
  },

  following: ({ id }, { first, after }, { services }) => {
    return services.followedAuthorService.getFollowedAuthorsConnection({
      first,
      after,
      followerId: id,
    });
  },

  followingCount: ({ id }, _, { services }) => {
    return services.authorService.getFollowedAuthorsCount({
      followerId: id,
    });
  },
};
