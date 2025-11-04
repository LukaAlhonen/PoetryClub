import { useQuery } from "@apollo/client/react"
import { Layout } from "../../components"
import QueryResult from "../../components/query-result"
import { GET_AUTHOR } from "./author.graphql"
import type { GetAuthorQuery, GetAuthorQueryVariables } from "../../__generated__/graphql"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import PoemGrid from "../../components/PoemGrid/poem-grid"
import AuthorDetail from "../../components/AuthorDetail/author-detail"
import ScrollContainer from "../../components/ScrollContainer/scroll-container"
import { NetworkStatus } from "@apollo/client"
import FollowedAuthors from "../../components/FollowedAuthors/followed-authors"
import { useAuth } from "../../context/use-auth"
import styled from "@emotion/styled"
import colors from "../../colors"

import SavedSVG from "../../assets/icons/book-alt.svg?react";
import LikeSVG from "../../assets/icons/heart.svg?react";
import { useEffect } from "react"

const Author = () => {
  const { username = "" } = useParams();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { loading, error, data, networkStatus, fetchMore } = useQuery<GetAuthorQuery, GetAuthorQueryVariables>(GET_AUTHOR, {
    variables: {
      username,
      poemsLimit: 5,
      followedByLimit: 10,
      followingLimit: 10,
      likedPoemsLimit: 5,
      savedPoemsLimit: 5,
    }
  })

  const showFollowers = location.pathname.endsWith("/followers");
  const showFollowing = location.pathname.endsWith("/following");

  const poems = data?.authorByUsername?.poems?.edges?.map(edge => edge?.node);
  const likedPoems = data?.authorByUsername?.likedPoems?.edges?.map(edge => edge?.node?.poem)
  const savedPoems = data?.authorByUsername?.savedPoems?.edges?.map(edge => edge?.node?.poem)

  const poemsToDisplay = location.pathname.endsWith("/likes") ? likedPoems : location.pathname.endsWith("/saved") ? savedPoems : poems;

  useEffect(() => {
    if (location.pathname.endsWith("/saved") && (!user || user !== username)) navigate("/")
  })

  const isLoading = networkStatus === NetworkStatus.fetchMore;

  const handleIntersect = () => {
    if (showFollowers) {
      if (data?.authorByUsername?.followedBy?.pageInfo?.hasNextPage) {
        fetchMore({
          variables: {
            poemsLimit: 5,
            followedByLimit: 10,
            followedByCursor: data.authorByUsername.followedBy.pageInfo.endCursor,
            followingLimit: 10,
          }
        })
      }
    } else if (showFollowing) {
      if (data?.authorByUsername?.following?.pageInfo?.hasNextPage) {
        fetchMore({
          variables: {
            poemsLimit: 5,
            followedByLimit: 10,
            followingLimit: 10,
            followingCursor: data.authorByUsername.following.pageInfo.endCursor,
          }
        })
      }
    } else if (location.pathname.endsWith("/likes")) {
      if (data?.authorByUsername?.likedPoems?.pageInfo?.hasNextPage) {
        fetchMore({ variables: { likedPoemsLimit: 5, likedPoemsCursor: data.authorByUsername.likedPoems.pageInfo.endCursor } })
      }
    } else if (location.pathname.endsWith("/saved")) {
      if (data?.authorByUsername.savedPoems?.pageInfo?.hasNextPage) {
        fetchMore({ variables: { savedPoemsLimit: 5, savedPoemsCursor: data.authorByUsername.savedPoems.pageInfo.endCursor }})
      }
    } else {
      if (data?.authorByUsername?.poems?.pageInfo?.hasNextPage) {
        fetchMore({ variables: { poemsLimit: 5, poemsCursor: data.authorByUsername.poems.pageInfo.endCursor } });
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
                <AuthorDetail author={data?.authorByUsername}></AuthorDetail>
                <LinksContainer>
                  <LinkContainer data-testid={`poems-link-${username}`} to={`/author/${username}`} isActive={poemsToDisplay === poems}>Poems</LinkContainer>
                  <LinkContainer data-testid={`likes-link-${username}`} to={`/author/${username}/likes`} isActive={poemsToDisplay === likedPoems}><LikeIcon />Likes</LinkContainer>
                  {user && user === username ? <LinkContainer data-testid={`saved-link-${username}`} to={`/author/${username}/saved`} isActive={poemsToDisplay === savedPoems}><SavedIcon />Saved</LinkContainer> : null}
                </LinksContainer>
                <PoemGrid poems={poemsToDisplay} isLoading={isLoading} pageSize={data?.authorByUsername?.poems?.pageInfo?.pageSize} />
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

const LinksContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  padding: "1rem",
  background: colors.textEggshell,
  border: "0.15rem solid gray",
  borderRadius: "0.5rem",
  justifyContent: "space-evenly",
})

const LinkContainer = styled(Link, {shouldForwardProp: (prop) => prop !== "isActive"})<{ isActive?: boolean }>(({ isActive }) => ({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  background: isActive ? colors.wineRed : colors.textEggshell,
  color: isActive ? colors.textEggshell : colors.backgroundBlack,
  padding: "1rem",
  border: "0.15rem solid gray",
  borderRadius: "0.5rem",
  fontWeight: "bold",
  transition: "color 0.1s ease-in-out, background 0.1s ease-in-out",
  "&:hover": {
    color: colors.textEggshell,
    background: colors.wineRed,
    cursor: "pointer"
  }
}))

const svgStyles = {
  width: "1.5rem",
  height: "1.5rem",
  marginRight: "0.3rem",
  "& path": {
    fill: "currentcolor"
  }
}

const SavedIcon = styled(SavedSVG)({
  ...svgStyles,
})

const LikeIcon = styled(LikeSVG)({
  ...svgStyles,
})
