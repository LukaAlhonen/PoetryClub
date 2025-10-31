import { Resolvers } from "../__generated__/types.js";
import { handlePrismaError } from "../utils/prisma-error-handler.js";

export const FollowedAuthor: Resolvers["FollowedAuthor"] = {
  follower: async ({ followerId }, _, { services }) => {
    try {
      const follower = await services.authorService.getAuthorById({
        id: followerId,
      });
      return follower;
    } catch (err) {
      handlePrismaError({err})
    }
  },

  following: async ({ followingId }, _, { services }) => {
    try {
      const following = await services.authorService.getAuthorById({
        id: followingId,
      });
      return following;
    } catch (err) {
      handlePrismaError({err})
    }
  },
};
