import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/schema.ts",
  generates: {
    "./src/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "./context.js#MyContext",
        mappers: {
          Poem: "./models.js#PoemModel",
          Author: "./models.js#AuthorModel",
          Comment: "./models.js#CommentModel",
          Collection: "./models.js#CollectionModel",
          SavedPoem: "./models.js#SavedPoemModel",
          Like: "./models.js#LikeModel",
          FollowedAuthor: "./models.js#FollowedAuthorModel",
        },
      },
    },
  },
};

export default config;
