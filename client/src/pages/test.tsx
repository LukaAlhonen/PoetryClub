import { Layout } from "../components";
import QueryResult from "../components/query-result";

const Test = () => {
  return (
    <Layout>
      <QueryResult loading={true} error={null} data={null}>
        <div></div>
      </QueryResult>
    </Layout>
  );
};

export default Test;
