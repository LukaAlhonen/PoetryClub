import { Resolvers } from "../__generated__/types.js";

export const FollowedAuthor: Resolvers["FollowedAuthor"] = {
  follower: ({ followerId }, _, { services }) => {
    return services.authorService.getAuthorById({
      id: followerId,
    });
  },

  following: ({ followingId }, _, { services }) => {
    return services.authorService.getAuthorById({
      id: followingId,
    });
  },
};
