import { Layout } from "../../components";
import { useQuery } from "@apollo/client/react";
import PoemCard from "../../components/PoemCard/poem-card";
import { GET_POEMS } from "./poems.graphql";
import QueryResult from "../../components/query-result";
import styled from "@emotion/styled";
import colors from "../../colors";
import { useEffect, useRef } from "react";
import { NetworkStatus } from "@apollo/client";

const Poems = () => {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(GET_POEMS, {
    variables: { first: 5},
    notifyOnNetworkStatusChange: true
  });

  const isLoading = networkStatus === NetworkStatus.fetchMore;

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (data?.poems?.pageInfo) {
            if (data.poems.pageInfo.hasNextPage) {
              fetchMore({ variables: { first: data.poems.pageInfo.pageSize, after: data.poems.pageInfo.endCursor } })
            }
          }
        }
      },
      {
        root: scrollRef.current,
        threshold: 0.1,
        rootMargin: "0% 0% 20%"
      }
    )
    if (bottomRef.current) {
      observer.observe(bottomRef.current)
    }

    return () => observer.disconnect();
  },[data, fetchMore])

  return (
    <Layout>
      <ScrollContainer ref={scrollRef} data-scroll-container>
        <QueryResult loading={loading} error={error} data={data}>
          <PoemsContainer>
            {data?.poems?.edges?.map((edge) => (
              edge?.node ? (<PoemCard key={edge.node.id} poem={edge.node} /> ) : null
            ))}
            { isLoading && data?.poems?.pageInfo?.pageSize ?
              Array.from({ length: data.poems.pageInfo.pageSize }).map((_, i) => (
                <PoemCard key={`skeleton_${i}`} />
              ))
             : null}
          </PoemsContainer>
        </QueryResult>
        <div ref={bottomRef} style={{ height: "1px" }} />
      </ScrollContainer>
    </Layout>
  );
};

export default Poems;

const PoemsContainer = styled.div({
  background: colors.backgroundBlack,
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

const ScrollContainer = styled.div({
  flexGrow: 1,
  overflowY: "auto",
  minHeight: 0,
})
