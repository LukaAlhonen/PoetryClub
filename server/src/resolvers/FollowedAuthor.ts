import { Resolvers } from "../__generated__/types.js";

export const FollowedAuthor: Resolvers["FollowedAuthor"] = {
  follower: ({ followerId }, _, { dataSources }) => {
    return dataSources.poemAPI.getAuthorById({
      id: followerId,
    });
  },

  following: ({ followingId }, _, { dataSources }) => {
    return dataSources.poemAPI.getAuthorById({
      id: followingId,
    });
  },
};
