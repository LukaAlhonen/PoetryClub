import { useParams } from "react-router-dom";
import { GET_POEM } from "./poem.graphql";
// import { useQuery } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import PoemDetail from "../../components/PoemDetail/poem-detail";
import { Layout } from "../../components";
import QueryResult from "../../components/query-result";
import styled from "@emotion/styled";
import ScrollContainer from "../../components/ScrollContainer/scroll-container";


const Poem = () => {
  const { poemId = "" } = useParams();

  const { loading, error, data } = useQuery(GET_POEM, {
    variables: { poemId },
  });

  if (error) {
    console.log(error)
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }

  const handleIntersect = () => { };

  return (
    <Layout>
      <ScrollContainer onIntersect={handleIntersect}>
        <QueryResult loading={loading} error={error} data={data}>
          <PoemDetail poem={data?.poem} />
        </QueryResult>
      </ScrollContainer>
    </Layout>
  );
};

export default Poem;

// const PoemContainer = styled.div({
//   display: "flex",
//   flexDirection: "column",
//   overflowY: "auto",
//   width: "100%",
//   height: "100%",
//   justifyContent: "center"
// });
