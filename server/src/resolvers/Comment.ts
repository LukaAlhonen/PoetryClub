import { Resolvers } from "../__generated__/types.js";

export const Comment: Resolvers["Comment"] = {
  poem: ({ poemId }, _, { services }) => {
    return services.poemService.getPoem({ id: poemId });
  },

  author: ({ authorId }, _, { services }) => {
    return services.authorService.getAuthorById({ id: authorId });
  },
};
