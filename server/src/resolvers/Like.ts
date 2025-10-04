import { Resolvers } from "../__generated__/types.js";

export const Like: Resolvers["Like"] = {
  author: ({ authorId }, _, { services }) => {
    return services.authorService.getAuthorById({
      id: authorId,
    });
  },

  poem: ({ poemId }, _, { services }) => {
    return services.poemService.getPoem({ id: poemId });
  },
};
