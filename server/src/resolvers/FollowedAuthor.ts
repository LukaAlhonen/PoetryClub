import { Resolvers } from "../__generated__/types.js";

export const FollowedAuthor: Resolvers["FollowedAuthor"] = {
  follower: ({ followerId }, _, { dataSources, services }) => {
    // return dataSources.poemAPI.getAuthorById({
    //   id: followerId,
    // });
    return services.authorService.getAuthorById({
      id: followerId,
    });
  },

  following: ({ followingId }, _, { dataSources, services }) => {
    // return dataSources.poemAPI.getAuthorById({
    //   id: followingId,
    // });
    return services.authorService.getAuthorById({
      id: followingId,
    });
  },
};
