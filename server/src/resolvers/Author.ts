import { Resolvers } from "../__generated__/types.js";

export const Author: Resolvers["Author"] = {
  poems: ({ id }, { limit, cursor }, { dataSources, services }) => {
    // return dataSources.poemAPI.getPoems({
    //   limit,
    //   cursor,
    //   filter: {
    //     authorId: id,
    //   },
    // });
    return services.poemService.getPoems({
      limit,
      cursor,
      filter: {
        authorId: id,
      },
    });
  },

  savedPoems: ({ id }, { limit, cursor }, { dataSources, services }) => {
    // return dataSources.poemAPI.getSavedPoems({
    //   limit,
    //   cursor,
    //   authorId: id,
    // });
    return services.savedPoemService.getSavedPoems({
      limit,
      cursor,
      authorId: id,
    });
  },

  comments: ({ id }, { limit, cursor }, { dataSources, services }) => {
    // return dataSources.poemAPI.getComments({
    //   limit,
    //   cursor,
    //   authorId: id,
    // });
    return services.commentService.getComments({
      limit,
      cursor,
      authorId: id,
    });
  },

  collections: ({ id }, { limit, cursor }, { dataSources, services }) => {
    // return dataSources.poemAPI.getCollections({
    //   limit,
    //   cursor,
    //   filter: {
    //     authorId: id,
    //   },
    // });
    return services.collectionService.getCollections({
      limit,
      cursor,
      filter: {
        authorId: id,
      },
    });
  },

  likedPoems: ({ id }, { limit, cursor }, { dataSources, services }) => {
    // return dataSources.poemAPI.getLikes({
    //   limit,
    //   cursor,
    //   authorId: id,
    // });
    return services.likeService.getLikes({
      limit,
      cursor,
      authorId: id,
    });
  },

  followedBy: ({ id }, { limit, cursor }, { dataSources, services }) => {
    // return dataSources.poemAPI.getFollowedAuthors({
    //   limit,
    //   cursor,
    //   followingId: id,
    // });
    return services.followedAuthorService.getFollowedAuthors({
      limit,
      cursor,
      followingId: id,
    });
  },

  followedByCount: ({ id }, _, { dataSources, services }) => {
    // return dataSources.poemAPI.getFollowedAuthorsCount({
    //   followingId: id,
    // });
    return services.authorService.getFollowedAuthorsCount({
      followingId: id,
    });
  },

  following: ({ id }, { limit, cursor }, { dataSources, services }) => {
    // return dataSources.poemAPI.getFollowedAuthors({
    //   limit,
    //   cursor,
    //   followerId: id,
    // });
    return services.followedAuthorService.getFollowedAuthors({
      limit,
      cursor,
      followerId: id,
    });
  },

  followingCount: ({ id }, _, { dataSources, services }) => {
    // return dataSources.poemAPI.getFollowedAuthorsCount({
    //   followerId: id,
    // });
    return services.authorService.getFollowedAuthorsCount({
      followerId: id,
    });
  },
};
