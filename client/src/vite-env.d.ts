/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHQL_SERVER_URL: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
