import dotenv from "dotenv";

dotenv.config();

interface ENV {
  DATABASE_URL: string | undefined;
  REDIS_URL: string | undefined;
  JWT_SECRET: string | undefined;
}

interface Config {
  DATABASE_URL: string;
  REDIS_URL: string;
  JWT_SECRET: string;
}

const getConfig = (): ENV => {
  return {
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_URL: process.env.REDIS_URL,
    JWT_SECRET: process.env.JWT_SECRET,
  };
};

const getSanitizedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined || value.trim() === "") {
      throw new Error(`Missing key ${key} in .env`);
    }
    console.log(`Found key ${key}`);
  }

  return config as Config;
};

const config = getConfig();
const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;
