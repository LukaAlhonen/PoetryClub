import { Resolvers } from "../__generated__/types.js";

export const Author: Resolvers["Author"] = {
  poems: ({ id }, { limit, cursor }, { services }) => {
    return services.poemService.getPoems({
      limit,
      cursor,
      filter: {
        authorId: id,
      },
    });
  },

  savedPoems: ({ id }, { limit, cursor }, { services }) => {
    return services.savedPoemService.getSavedPoems({
      limit,
      cursor,
      authorId: id,
    });
  },

  comments: ({ id }, { limit, cursor }, { services }) => {
    return services.commentService.getComments({
      limit,
      cursor,
      authorId: id,
    });
  },

  collections: ({ id }, { limit, cursor }, { services }) => {
    return services.collectionService.getCollections({
      limit,
      cursor,
      filter: {
        authorId: id,
      },
    });
  },

  likedPoems: ({ id }, { limit, cursor }, { services }) => {
    return services.likeService.getLikes({
      limit,
      cursor,
      authorId: id,
    });
  },

  followedBy: ({ id }, { limit, cursor }, { services }) => {
    return services.followedAuthorService.getFollowedAuthors({
      limit,
      cursor,
      followingId: id,
    });
  },

  followedByCount: ({ id }, _, { services }) => {
    return services.authorService.getFollowedAuthorsCount({
      followingId: id,
    });
  },

  following: ({ id }, { limit, cursor }, { services }) => {
    return services.followedAuthorService.getFollowedAuthors({
      limit,
      cursor,
      followerId: id,
    });
  },

  followingCount: ({ id }, _, { services }) => {
    return services.authorService.getFollowedAuthorsCount({
      followerId: id,
    });
  },
};
