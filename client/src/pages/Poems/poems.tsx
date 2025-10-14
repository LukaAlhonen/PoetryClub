import { Layout } from "../../components";
import { useQuery } from "@apollo/client/react";
import PoemCard from "../../components/PoemCard/poem-card";
import { GET_POEMS } from "./poems.graphql";
import QueryResult from "../../components/query-result";
import styled from "@emotion/styled";
import colors from "../../colors";
import { useEffect, useRef, useState } from "react";
// import type { GetPoemsQuery, GetPoemsQueryVariables } from "../../__generated__/types";

const Poems = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_POEMS, {
    variables: { limit: 20}
  });

  const [cursor, setCursor] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("fetching more poems")
        }
      },
      {
        root: document.querySelector("[data-scroll-container]"),
        threshold: 0.1,
      }
    )
    if (bottomRef.current) {
      observer.observe(bottomRef.current)
    }

    return () => observer.disconnect();
  },[data, fetchMore])


  return (
    <Layout>
      <QueryResult loading={loading} error={error} data={data}>
        <PoemsContainer id="poems-container">
          {data?.poems?.map((poem) => (
            <PoemCard key={poem.id} poem={poem} />
          ))}
          <div ref={bottomRef} style={{ height: "1px" }} />
        </PoemsContainer>
      </QueryResult>
    </Layout>
  );
};

export default Poems;

const PoemsContainer = styled.div({
  background: colors.backgroundBlack,
  overflowY: "visible",
  overflowX: "hidden",
  display: "grid",
  gap: "1em",
  width: "100%",
  minHeight: "100vh",
  gridTemplateColumns: "repeat(auto-fit, minmax(20em, 1fr))",
  justifyContent: "center",
  padding: "1em",
  boxSizing: "border-box",
});
