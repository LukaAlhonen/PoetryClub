import { PoemAPI } from "./datasources/poem-api";

export type DataSourceContext = {
  dataSources: {
    poemAPI: PoemAPI;
  };
};
