import { useParams } from "react-router-dom";
import { GET_POEM } from "../queries";
import { useQuery } from "@apollo/client";
import PoemDetail from "../components/poem-detail";
import { Layout } from "../components";
import QueryResult from "../components/query-result";

const Poem = () => {
  const { poemId = "" } = useParams();

  const { loading, error, data } = useQuery(GET_POEM, {
    variables: { poemId },
  });

  if (loading)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  if (error)
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );

  return (
    <Layout>
      <QueryResult loading={loading} error={error} data={data}>
        <PoemDetail poem={data?.poem} />
      </QueryResult>
    </Layout>
  );
};

export default Poem;
