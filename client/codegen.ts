import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://ubuntubox.local:4000/graphql",
  documents: [
    "./src/graphql/queries/**/*.{ts,tsx,graphql}",
    "./src/graphql/mutations/**/*.{ts,tsx,graphql}",
    "./src/graphql/fragments/**/*.{ts,tsx,graphql}"
  ],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
      config: {
        useTypeImports: true,
        defaultScalarType: "unknown"
      },
    },
    "./src/__generated__/types.ts": {
      plugins: ["typescript", "typescript-operations"],
      config: {
        defaultScalarType: "unknown"
      },
    },
  },
};

export default config;
