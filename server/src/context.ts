import { PoemAPI } from "./datasources/poem-api.js";
import { JwtPayload } from "jsonwebtoken";

export type MyContext = {
  user: JwtPayload;
  dataSources: {
    poemAPI: PoemAPI;
  };
};
