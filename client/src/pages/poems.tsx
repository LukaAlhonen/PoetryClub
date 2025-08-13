import { Layout } from "../components";
import { useQuery } from "@apollo/client";
import PoemCard from "../containers/poem-card";
import { GET_POEMS } from "../queries";
import QueryResult from "../components/query-result";

const Poems = () => {
  const { loading, error, data } = useQuery(GET_POEMS);

  return (
    <Layout>
      <QueryResult loading={loading} error={error} data={data}>
        {data?.poems?.map((poem) => (
          <PoemCard key={poem.id} poem={poem} />
        ))}
      </QueryResult>
    </Layout>
  );
};

export default Poems;
