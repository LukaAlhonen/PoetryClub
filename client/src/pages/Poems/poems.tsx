import { Layout } from "../../components";
import { useQuery } from "@apollo/client/react";
import PoemGrid from "../../components/PoemGrid/poem-grid";
import { GET_POEMS } from "./poems.graphql";
import QueryResult from "../../components/query-result";
import { NetworkStatus } from "@apollo/client";
import type { GetPoemsQuery, GetPoemsQueryVariables } from "../../__generated__/graphql";
import ScrollContainer from "../../components/ScrollContainer/scroll-container";

const Poems = () => {
  const { loading, error, data, fetchMore, networkStatus } = useQuery<GetPoemsQuery, GetPoemsQueryVariables>(GET_POEMS, {
    variables: { first: 5},
    notifyOnNetworkStatusChange: true
  });

  const isLoading = networkStatus === NetworkStatus.fetchMore;

  const handleIntersect = () => {
    if (data?.poems?.pageInfo?.hasNextPage) {
      fetchMore({ variables: { first: data.poems.pageInfo.pageSize, after: data.poems.pageInfo.endCursor } })
    }
  }

  return (
    <Layout>
      <ScrollContainer onIntersect={handleIntersect}>
        <QueryResult loading={loading} error={error} data={data}>
          <PoemGrid poems={data} isLoading={isLoading} />
        </QueryResult>
      </ScrollContainer>
    </Layout>
  );
};

export default Poems;
