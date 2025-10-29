import { useMutation } from "@apollo/client/react";
import styled from "@emotion/styled"
import type { RemoveLikeMutation, CreateLikeMutation, CreateLikeMutationVariables, RemoveLikeMutationVariables } from "../../__generated__/graphql";
import { CREATE_LIKE, REMOVE_LIKE } from "./like-button.graphql";
import colors from "../../colors";
import { useAuth } from "../../context/use-auth";
import { useEffect, useState } from "react";

interface LikeButtonProps {
  children: React.ReactNode;
  poemId?: string;
  likedByCurrentUser?: CreateLikeMutation["createLike"] | null;
}

const LikeButton = (props: LikeButtonProps) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(props.likedByCurrentUser ? true : false);

  const [createLikeMutation, { loading: createLoading, error: createError }] = useMutation<CreateLikeMutation, CreateLikeMutationVariables>(CREATE_LIKE, {
    update(cache, { data }) {
      cache.modify({
        id: cache.identify({ __typename: "Poem", id: props.poemId}),
        fields: {
          likesCount(existingCount = 0) {
            return existingCount + 1;
          }
        }
      })
      if (data?.createLike) {
        cache.modify({
          id: cache.identify({ __typename: "Poem", id: props.poemId}),
          fields: {
            likedByCurrentUser() { return data.createLike }
          }
        })
      }
    }
  })

  const [removeLikeMutation, { loading: removeLoading, error: removeError }] = useMutation<RemoveLikeMutation, RemoveLikeMutationVariables>(REMOVE_LIKE, {
    update(cache, { data }) {
      cache.modify({
        id: cache.identify({ __typename: "Poem", id: props.poemId}),
        fields: {
          likesCount(existingCount = 0) {
            return existingCount - 1;
          }
        }
      })
      if (data?.removeLike) {
        cache.modify({
          id: cache.identify({ __typename: "Poem", id: props.poemId}),
          fields: {
            likedByCurrentUser() { return null }
          }
        })
      }
    }
  })

  useEffect(() => {
    if (!user) setIsLiked(false);
  }, [user])

  const handleClick = () => {
    if (props.poemId && !createLoading && !removeLoading && user) {
      if (!isLiked) {
        setIsLiked(true);
        createLikeMutation({ variables: { poemId: props.poemId }})
      } else if (isLiked && props.likedByCurrentUser?.id) {
        setIsLiked(false)
        removeLikeMutation({ variables: { likeId: props.likedByCurrentUser.id }})
      }
    }
  }

  if (createError) console.error(createError);
  if (removeError) console.error(removeError);

  return (
    <LikeButtonContainer onClick={handleClick} isLiked={isLiked}>
      {props.children}
    </LikeButtonContainer>
  )
}

export default LikeButton;

const LikeButtonContainer = styled.div<{
  isLiked?: boolean,
}>(({
  isLiked,
}) => ({
  display: "flex",
  height: "2.1rem",
  minWidth: "3.2rem",
  border: "0.15rem solid gray",
  background: isLiked ? colors.wineRed : colors.textEggshell,
  color: isLiked ? colors.textEggshell : colors.backgroundBlack,
  borderRadius: "0.5rem",
  padding: "0.2rem 0.3rem 0.2rem 0.3rem",
  alignItems: "center",
  "&:hover": {
    background: colors.wineRed,
    color: colors.textEggshell,
    cursor: "pointer"
  }
}))
