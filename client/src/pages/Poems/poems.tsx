import { Layout } from "../../components";
import { useQuery } from "@apollo/client";
import PoemCard from "../../components/PoemCard/poem-card";
import { GET_POEMS } from "./poems.graphql";
import QueryResult from "../../components/query-result";
import styled from "@emotion/styled";
import colors from "../../colors";

const Poems = () => {
  const { loading, error, data } = useQuery(GET_POEMS);

  return (
    <Layout>
      <QueryResult loading={loading} error={error} data={data}>
        <PoemsContainer>
          {data?.poems?.map((poem) => (
            <PoemCard key={poem.id} poem={poem} />
          ))}
        </PoemsContainer>
      </QueryResult>
    </Layout>
  );
};

export default Poems;

const PoemsContainer = styled.div({
  background: colors.background2,
  overflowY: "scroll",
  overflowX: "hidden",
  display: "grid",
  gap: "1em",
  width: "100%",
  height: "calc(100vh - 5em)",
  gridTemplateColumns: "repeat(auto-fit, minmax(20em, 1fr))",
  justifyContent: "center",
  padding: "1em",
  boxSizing: "border-box",
});
