import { UNFOLLOW_AUTHOR } from "./unfollow-button.graphql"
import type { UnfollowAuthorMutation, UnfollowAuthorMutationVariables } from "../../__generated__/graphql"
import { useMutation } from "@apollo/client/react";
import styled from "@emotion/styled";
import colors from "../../colors";
import { useAuth } from "../../context/use-auth";

import UnfollowSVG from "../../assets/icons/unfollow.svg?react"
import { GET_AUTHOR } from "../../pages/Author/author.graphql";
import { useParams } from "react-router-dom";

interface UnfollowButtonProps {
  followedAuthorId?: string | null;
}

const UnfollowButton = (props: UnfollowButtonProps) => {
  const { username = "" } = useParams();
  const { user, userId } = useAuth();

  const [unfollowAuthorMutation, { loading, error }] = useMutation<UnfollowAuthorMutation, UnfollowAuthorMutationVariables>(UNFOLLOW_AUTHOR, {
    update(cache, { data }) {

      if (user) {
        const cachedAuthor = cache.readQuery({ query: GET_AUTHOR, variables: { username, poemsLimit: 5 } });
        if (cachedAuthor && data?.removeFollowedAuthor) {
          const updatedEdges = cachedAuthor.authorByUsername.followedBy.edges.filter((edge) => (
            edge?.node?.id !== data.removeFollowedAuthor.id
          )) ?? [];
          cache.writeQuery({
            query: GET_AUTHOR,
            variables: { username, poemsLimit: 5 },
            data: {
              ...cachedAuthor,
              authorByUsername: {
                ...cachedAuthor.authorByUsername,
                followedBy: {
                  edges: updatedEdges,
                  pageInfo: cachedAuthor.authorByUsername.followedBy.pageInfo
                }
              }
            }
          })

          cache.modify({
            id: cache.identify({ __typename: "Author", id: data.removeFollowedAuthor.following.id}),
            fields: {
              followedByCurrentUser() { return null },
              followedByCount(existingCount = 0) {
                return existingCount - 1;
              }
            }
          })
        }

        const cachedAuthor2 = cache.readQuery({ query: GET_AUTHOR, variables: { username: user, poemsLimit: 5, followingLimit: 10, followedByLimit: 10 } });
        if (cachedAuthor2 && data?.removeFollowedAuthor) {
          const updatedEdges2 = cachedAuthor2.authorByUsername.following.edges.filter((edge) => (
            edge?.node?.id !== data.removeFollowedAuthor.id
          )) ?? [];
          cache.writeQuery({
            query: GET_AUTHOR,
            variables: { username: user, poemsLimit: 5, followingLimit: 10, followedByLimit: 10 },
            data: {
              ...cachedAuthor2,
              authorByUsername: {
                ...cachedAuthor2.authorByUsername,
                following: {
                  edges: updatedEdges2,
                  pageInfo: cachedAuthor2.authorByUsername.following.pageInfo
                }
              }
            }
          })

          cache.modify({
            id: cache.identify({ __typename: "Author", id: userId}),
            fields: {
              followingCount(existingCount = 0) {
                return existingCount - 1;
              }
            }
          })
        }
      }
    }
  });

  const handleUnfollow = () => {
    if (props.followedAuthorId) unfollowAuthorMutation({variables: { followedAuthorId: props.followedAuthorId }})
  }

  if (error) console.error(error.message)


  if (!loading) {
    return <UnfollowButtonContainer onClick={handleUnfollow}><FollowIcon />Unfollow</UnfollowButtonContainer>
  } else return null;
}

export default UnfollowButton;

const UnfollowButtonContainer = styled.button({
  display: "flex",
  border: "0.15rem solid gray",
  borderRadius: "0.5rem",
  height: "3em",
  padding: "1rem",
  background: colors.textEggshell,
  color: colors.backgroundBlack,
  alignItems: "center",
  fontWeight: "bold",
  transition: "color 0.1s ease-in-out, background 0.1s ease-in-out",
  "&:hover": {
    color: colors.textEggshell,
    background: colors.wineRed,
    cursor: "pointer"
  }
})

const FollowIcon = styled(UnfollowSVG)({
  width: "1rem",
  height: "1rem",
  marginRight: "0.3rem",
  "& path": {
    fill: "currentcolor"
  }
})
