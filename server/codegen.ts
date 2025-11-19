import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/schema.ts",
  documents: [
    "./src/__tests__/queries/**/*.ts",
    "./src/__tests__/mutations/**/*.ts",
  ],
  generates: {
    "./src/__generated__/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../types/context.js#MyContext",
        mappers: {
          Poem: "../models.js#PoemModel",
          Author: "../models.js#AuthorModel",
          Comment: "../models.js#CommentModel",
          Collection: "../models.js#CollectionModel",
          SavedPoem: "../models.js#SavedPoemModel",
          Like: "../models.js#LikeModel",
          FollowedAuthor: "../models.js#FollowedAuthorModel",
        },
      },
    },
    "./src/__generated__/graphql.ts": {
      plugins: ["typescript-operations", "typescript", "typed-document-node"],
    },
  },
};

export default config;
