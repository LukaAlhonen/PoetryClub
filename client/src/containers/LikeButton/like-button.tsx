import { useMutation } from "@apollo/client/react";
import styled from "@emotion/styled"
import type { RemoveLikeMutation, CreateLikeMutation, CreateLikeMutationVariables, RemoveLikeMutationVariables } from "../../__generated__/graphql";
import { CREATE_LIKE, REMOVE_LIKE } from "./like-button.graphql";
import colors from "../../colors";
import { useAuth } from "../../context/use-auth";
import { GET_POEM } from "../../pages/Poem/poem.graphql";
import { useEffect, useState } from "react";


interface LikeButtonProps {
  children: React.ReactNode;
  poemId?: string;
  isLiked?: boolean;
  likeId?: string | null;
  like?: CreateLikeMutation["createLike"]
}

const LikeButton = (props: LikeButtonProps) => {
  const { user, userId } = useAuth();
  const [isLiked, setIsLiked] = useState<boolean>(props.isLiked === undefined ? false : props.isLiked);
  const [createLikeMutation, { loading: createLoading, error: createError }] = useMutation<CreateLikeMutation, CreateLikeMutationVariables>(CREATE_LIKE, {
    optimisticResponse: {
      __typename: "Mutation",
      createLike: {
        __typename: "Like",
        id: "temp_like_id",
        poem: {
          id: props.poemId ?? "temp_poem_id",
        },
        author: {
          id: userId ?? "temp_author_id",
          username: user ?? "temp_username"
        }
      }
    },
    update(cache){
      cache.modify({
        id: cache.identify({ __typename: "Poem", id: props.poemId}),
        fields: {
          likesCount(existingCount = 0) {
            return existingCount + 1;
          }
        }
      })
    },
    refetchQueries: [
      {
        query: GET_POEM,
        variables: { poemId: props.poemId, commentsLimit: 5, authorId: userId }
      }
    ],
  })
  const [removeLikeMutation, { loading: removeLoading, error: removeError }] = useMutation<RemoveLikeMutation, RemoveLikeMutationVariables>(REMOVE_LIKE, {
    optimisticResponse: {
      __typename: "Mutation",
      removeLike: {
        __typename: "Like",
        id: "temp_remove_id",
        poem: {
          id: props.poemId ?? "temp_poem_id",
        },
        author: {
          id: userId ?? "temp_author_id",
          username: user ?? "temp_username"
        }
      }
    },
    update(cache){
      cache.modify({
        id: cache.identify({ __typename: "Poem", id: props.poemId}),
        fields: {
          likesCount(existingCount = 0) {
            return existingCount - 1;
          }
        }
      })
    },
    refetchQueries: [
      {
        query: GET_POEM,
        variables: { poemId: props.poemId, commentsLimit: 5, authorId: userId }
      }
    ],
  })

  useEffect(() => {
    if (!user) setIsLiked(false)
  }, [user])

  const handleClick = () => {
    if (props.poemId && !createLoading && !removeLoading && user) {
      if (!isLiked) {
        setIsLiked(true)
        createLikeMutation({ variables: { poemId: props.poemId }})
      } else if (isLiked && props.likeId) {
        setIsLiked(false)
        removeLikeMutation({ variables: { likeId: props.likeId }})
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
