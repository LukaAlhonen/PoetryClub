import { useQuery } from "@apollo/client/react"
import { Layout } from "../../components"
import QueryResult from "../../components/query-result"
import { GET_AUTHOR } from "./author.graphql"
import type { GetAuthorQuery, GetAuthorQueryVariables } from "../../__generated__/graphql"
import { useParams } from "react-router-dom"
import PoemGrid from "../../components/PoemGrid/poem-grid"
import AuthorDetail from "../../components/AuthorDetail/author-detail"
import ScrollContainer from "../../components/ScrollContainer/scroll-container"
import { NetworkStatus } from "@apollo/client"

const Author = () => {
  const { username = "" } = useParams();

  const { loading, error, data, networkStatus, fetchMore } = useQuery<GetAuthorQuery, GetAuthorQueryVariables>(GET_AUTHOR, {
    variables: {
      username,
      poemsLimit: 5
    }
  })

  const isLoading = networkStatus === NetworkStatus.fetchMore;

  const handleIntersect = () => {
    if (data?.authorByUsername?.poems?.pageInfo?.hasNextPage) {
      fetchMore({ variables: { poemsLimit: 5, poemsCursor: data.authorByUsername.poems.pageInfo.endCursor } });
      console.log("fetching more")
    }
  };

  return (
    <Layout>
      <ScrollContainer onIntersect={handleIntersect}>
        <QueryResult loading={loading} error={error} data={data}>
          <AuthorDetail author={data?.authorByUsername}></AuthorDetail>
          <PoemGrid poems={data?.authorByUsername.poems} isLoading={isLoading} />
        </QueryResult>
      </ScrollContainer>
    </Layout>
  )
}

export default Author
