import dotenv from "dotenv";

dotenv.config();

interface ENV {
  DATABASE_URL: string | undefined;
  REDIS_URL: string | undefined;
  JWT_SECRET: string | undefined;
  APOLLO_SERVER_PORT: number | undefined;
}

interface Config {
  DATABASE_URL: string;
  REDIS_URL: string;
  JWT_SECRET: string;
  APOLLO_SERVER_PORT: number;
}

const getConfig = (): ENV => {
  return {
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_URL: process.env.REDIS_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    APOLLO_SERVER_PORT: Number.parseInt(process.env.APOLLO_SERVER_PORT),
  };
};

const getSanitizedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env`);
    } else if (value instanceof String || typeof value === "string") {
      if (value.trim() === "") {
        throw new Error(`${key} cannot be empty`);
      }
    }
  }

  return config as Config;
};

const config = getConfig();
const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;
