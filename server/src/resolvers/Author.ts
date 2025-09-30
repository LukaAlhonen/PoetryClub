import { Resolvers } from "../__generated__/types.js";

export const Author: Resolvers["Author"] = {
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

  followedBy: ({ id }, { limit, cursor }, { dataSources }) => {
    return dataSources.poemAPI.getFollowedAuthors({
      limit,
      cursor,
      followingId: id,
    });
  },

  followedByCount: ({ id }, _, { dataSources }) => {
    return dataSources.poemAPI.getFollowedAuthorsCount({
      followingId: id,
    });
  },

  following: ({ id }, { limit, cursor }, { dataSources }) => {
    return dataSources.poemAPI.getFollowedAuthors({
      limit,
      cursor,
      followerId: id,
    });
  },

  followingCount: ({ id }, _, { dataSources }) => {
    return dataSources.poemAPI.getFollowedAuthorsCount({
      followerId: id,
    });
  },
};
