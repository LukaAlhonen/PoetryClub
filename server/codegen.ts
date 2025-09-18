import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/schema.ts",
  generates: {
    "./src/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "./context#DataSourceContext",
        mappers: {
          Poem: "./models#PoemModel",
          User: "./models#UserModel",
          Comment: "./models#CommentModel",
          Collection: "./models#CollectionModel",
          SavedPoem: "./models#SavedPoemModel",
          Like: "./models#LikeModel",
        },
      },
    },
  },
};

export default config;
