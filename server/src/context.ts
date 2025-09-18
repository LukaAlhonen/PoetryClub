import { PoemAPI } from "./datasources/poem-api.js";

export type DataSourceContext = {
  dataSources: {
    poemAPI: PoemAPI;
  };
};
