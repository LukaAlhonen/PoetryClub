import { Resolvers } from "../__generated__/types.js";

export const Collection: Resolvers["Collection"] = {
  author: ({ authorId }, _, { dataSources, services }) => {
    // return dataSources.poemAPI.getAuthorById({
    //   id: authorId,
    // });
    return services.authorService.getAuthorById({
      id: authorId,
    });
  },

  poems: ({ id }, { limit, cursor }, { dataSources, services }) => {
    // return dataSources.poemAPI.getPoems({
    //   limit,
    //   cursor,
    //   filter: {
    //     collectionId: id,
    //   },
    // });
    return services.poemService.getPoems({
      limit,
      cursor,
      filter: {
        collectionId: id,
      },
    });
  },
};
