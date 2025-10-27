import { useMutation } from "@apollo/client/react"
import type { FollowAuthorMutation, FollowAuthorMutationVariables } from "../../__generated__/graphql";
import { FOLLOW_AUTHOR } from "./follow-button.graphql";
import styled from "@emotion/styled";
import colors from "../../colors";

import FollowSVG from "../../assets/icons/user-add.svg?react";
import { GET_AUTHOR } from "../../pages/Author/author.graphql";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/use-auth";

interface FollowButtonProps {
  followingId?: string;
}

const FollowButton = (props: FollowButtonProps) => {
  const { userId, user } = useAuth();
  const { username = "" } = useParams();
  const [followAuthorMutation, { loading, error }] = useMutation<FollowAuthorMutation, FollowAuthorMutationVariables>(FOLLOW_AUTHOR, {
    update(cache, { data }) {
      // Write new followedAuthor object to cache
      // Author who was followed
      const cachedAuthor = cache.readQuery({ query: GET_AUTHOR, variables: { username, poemsLimit: 5 } });
      if (cachedAuthor && data?.createFollowedAuthor) {
        const newNode = { node: data.createFollowedAuthor, cursor: data.createFollowedAuthor.id }
        cache.writeQuery({
          query: GET_AUTHOR,
          variables: { username, poemsLimit: 5 },
          data: {
            ...cachedAuthor,
            authorByUsername: {
              ...cachedAuthor.authorByUsername,
              followedBy: {
                edges: [newNode, ...cachedAuthor.authorByUsername.followedBy.edges],
                pageInfo: cachedAuthor.authorByUsername.followedBy.pageInfo
              }
            }
          }
        })
      }

      // Author who followed
      if (user) {
        const cachedAuthor2 = cache.readQuery({ query: GET_AUTHOR, variables: { username: user, poemsLimit: 5 } });
        if (cachedAuthor2 && data?.createFollowedAuthor) {
          const newNode = { node: data.createFollowedAuthor, cursor: data.createFollowedAuthor.id };
          cache.writeQuery({
            query: GET_AUTHOR,
            variables: { username: user, poemsLimit: 5 },
            data: {
              ...cachedAuthor2,
              authorByUsername: {
                ...cachedAuthor2.authorByUsername,
                following: {
                  edges: [newNode, ...cachedAuthor2.authorByUsername.following.edges],
                  pageInfo: cachedAuthor2.authorByUsername.following.pageInfo
                }
              }
            }
          })
        }
      }

      // Increment followedByCount
      cache.modify({
        id: cache.identify({ __typename: "Author", id: props.followingId }),
        fields: {
          followedByCount(existingCount = 0) {
            return existingCount + 1;
          }
        }
      })

      // Increment followingCount
      cache.modify({
        id: cache.identify({ __typename: "Author", id: userId}),
        fields: {
          followingCount(existingCount = 0) {
            return existingCount + 1;
          }
        }
      })
    }
  })

  const handleClick = () => {
    if (props.followingId) followAuthorMutation({ variables: { followingId: props.followingId } });
  }

  if (error) console.error(error.message);

  return (
    <FollowButtonContainer onClick={loading ? () => {} : handleClick}><FollowIcon />Follow</FollowButtonContainer>
  )
}

export default FollowButton;

const FollowButtonContainer = styled.button({
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

const FollowIcon = styled(FollowSVG)({
  width: "1rem",
  height: "1rem",
  marginRight: "0.3rem",
  "& path": {
    fill: "currentcolor"
  }
})
