import { useQuery } from "@apollo/client/react"
import { Layout } from "../../components"
import QueryResult from "../../components/query-result"
import { GET_AUTHOR } from "./author.graphql"
import type { GetAuthorQuery, GetAuthorQueryVariables } from "../../__generated__/graphql"
import { useLocation, useParams } from "react-router-dom"
import PoemGrid from "../../components/PoemGrid/poem-grid"
import AuthorDetail from "../../components/AuthorDetail/author-detail"
import ScrollContainer from "../../components/ScrollContainer/scroll-container"
import { NetworkStatus } from "@apollo/client"
import { useEffect, useState } from "react"
import FollowedAuthors from "../../components/FollowedAuthors/followed-authors"
import { useAuth } from "../../context/use-auth"

const Author = () => {
  const { username = "" } = useParams();
  const { userId } = useAuth();
  const location = useLocation();
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const { loading, error, data, networkStatus, fetchMore } = useQuery<GetAuthorQuery, GetAuthorQueryVariables>(GET_AUTHOR, {
    variables: {
      username,
      poemsLimit: 5,
      followedByLimit: 10,
      followingLimit: 10,
    }
  })

  const author = data?.authorByUsername;
  const followers = author?.followedBy?.edges ?? [];
  const followedEdge = followers.find(edge => edge?.node?.follower.id === userId);
  const isFollowed = Boolean(followedEdge);
  const followedAuthorId = followedEdge?.node?.id ?? null;

  useEffect(() => {
    setShowFollowers(location.pathname.endsWith("/followers"));
    setShowFollowing(location.pathname.endsWith("/following"));
  }, [location.pathname])

  const isLoading = networkStatus === NetworkStatus.fetchMore;

  const handleIntersect = () => {
    if (showFollowers) {
      if (data?.authorByUsername?.followedBy?.pageInfo?.hasNextPage) {
        fetchMore({ variables: {
          poemsLimit: 5,
          followedByLimit: 10,
          followedByCursor: data.authorByUsername.followedBy.pageInfo.endCursor,
          followingLimit: 10,
        }})
      }
    } else if (showFollowing) {
      if (data?.authorByUsername?.following?.pageInfo?.hasNextPage) {
        fetchMore({ variables: {
          poemsLimit: 5,
          followedByLimit: 10,
          followingLimit: 10,
          followingCursor: data.authorByUsername.following.pageInfo.endCursor,
        }})
      }
    } else {
      if (data?.authorByUsername?.poems?.pageInfo?.hasNextPage) {
        fetchMore({ variables: { poemsLimit: 5, followedByLimit: 10, followingLimit: 10, poemsCursor: data.authorByUsername.poems.pageInfo.endCursor } });
      }
    }
  };

  return (
    <Layout>
      <ScrollContainer onIntersect={handleIntersect}>
        <QueryResult loading={loading} error={error} data={data}>
          {
            !showFollowers && !showFollowing ? (
              <>
                <AuthorDetail author={data?.authorByUsername} isFollowed={isFollowed} followedAuthorId={followedAuthorId}></AuthorDetail>
                <PoemGrid poems={data?.authorByUsername.poems} isLoading={isLoading} />
              </>
            ) : showFollowers ?
            <FollowedAuthors followers={data?.authorByUsername?.followedBy} username={username} isLoading={isLoading} /> :
            showFollowing ? <FollowedAuthors following={data?.authorByUsername?.following} username={username} isLoading={isLoading} /> : null
          }
        </QueryResult>
      </ScrollContainer>
    </Layout>
  )
}

export default Author
