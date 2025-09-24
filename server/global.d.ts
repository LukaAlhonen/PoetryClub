export namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    REDIS_URL: string;
    JWT_SECRET: string;
    APOLLO_SERVER_PORT: number;
  }
}
