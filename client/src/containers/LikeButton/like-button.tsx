import { useMutation } from "@apollo/client/react";
import styled from "@emotion/styled"
import type { RemoveLikeMutation, CreateLikeMutation, CreateLikeMutationVariables, RemoveLikeMutationVariables } from "../../__generated__/graphql";
import { CREATE_LIKE, REMOVE_LIKE } from "./like-button.graphql";
import colors from "../../colors";
import { useAuth } from "../../context/use-auth";
import { useEffect, useState } from "react";
import { GET_AUTHOR } from "../../pages/Author/author.graphql";
import { useHandleError } from "../../utils/error-handler";

interface LikeButtonProps {
  children: React.ReactNode;
  poemId?: string;
  likedByCurrentUser?: CreateLikeMutation["createLike"] | null;
}

const LikeButton = (props: LikeButtonProps) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(props.likedByCurrentUser ? true : false);
  const handleError = useHandleError();

  const [createLikeMutation, { loading: createLoading }] = useMutation<CreateLikeMutation, CreateLikeMutationVariables>(CREATE_LIKE, {
    onError(error) {
      handleError({ error, shouldNotify: false });
    },
    update(cache, { data }) {
      if (user) {
        const cachedAuthor = cache.readQuery({
          query: GET_AUTHOR,
          variables: {
            username: user,
            poemsLimit: 5,
            savedPoemsLimit: 5,
            likedPoemsLimit: 5,
            followedByLimit: 10,
            followingLimit: 10
          },
        })

        if (data?.createLike && props.poemId) {
          const newLike = data.createLike;
          const newNode = { node: newLike, cursor: newLike.id };
          const poemRef = cache.identify({ __typename: "Poem", id: props.poemId });

          if (cachedAuthor) {
            cache.writeQuery({
              query: GET_AUTHOR,
              variables: { username: user, poemsLimit: 5, savedPoemsLimit: 5, likedPoemsLimit: 5, followedByLimit: 10, followingLimit: 10 },
              data: {
                ...cachedAuthor,
                authorByUsername: {
                  ...cachedAuthor?.authorByUsername,
                  likedPoems: {
                    edges: [newNode, ...cachedAuthor.authorByUsername.likedPoems.edges],
                    pageInfo: cachedAuthor.authorByUsername.likedPoems.pageInfo
                  }
                }
              }
            })
          };

          cache.modify({
            id: poemRef,
            fields: {
              likedByCurrentUser() { return newLike },
            }
          })
        }
      }
    },
  })

  const [removeLikeMutation, { loading: removeLoading }] = useMutation<RemoveLikeMutation, RemoveLikeMutationVariables>(REMOVE_LIKE, {
    onError(error){
      handleError({ error, shouldNotify: false });
    },
    update(cache, { data }) {
      if (user) {
        const cachedAuthor = cache.readQuery({
          query: GET_AUTHOR,
          variables: {
            username: user,
            poemsLimit: 5,
            savedPoemsLimit: 5,
            likedPoemsLimit: 5,
            followedByLimit: 10,
            followingLimit: 10
          },
        })
        if (cachedAuthor && data?.removeLike && props.poemId) {
          cache.writeQuery({
            query: GET_AUTHOR,
            variables: {
              username: user,
              poemsLimit: 5,
              savedPoemsLimit: 5,
              likedPoemsLimit: 5,
              followedByLimit: 10,
              followingLimit: 10
            },
            data: {
              ...cachedAuthor,
              authorByUsername: {
                ...cachedAuthor.authorByUsername,
                likedPoems: {
                  edges: cachedAuthor.authorByUsername.likedPoems.edges.filter((edge) => (
                    edge?.node?.id !== data.removeLike.id
                  )),
                  pageInfo: cachedAuthor.authorByUsername.likedPoems.pageInfo
                }
              }
            }
          })
        }
        cache.modify({
          id: cache.identify({ __typename: "Poem", id: props.poemId }),
          fields: {
            likedByCurrentUser() { return null },
            likesCount(existingCount = 0) {
              return existingCount - 1;
            }
          }
        })
      }
    },
  })

  useEffect(() => {
    if (!user) setIsLiked(false);
  }, [user])

  useEffect(() => {
    setIsLiked(!!props.likedByCurrentUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    if (!user) {
      handleError({ error: new Error("you must be logged in to like this poem") });
    }
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

  return (
    <LikeButtonContainer data-testid={`like-button-${props.poemId}`} onClick={handleClick} isLiked={isLiked}>
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
  background: isLiked ? colors.wineRed : colors.eggShellWhite,
  color: isLiked ? colors.eggShellWhite : colors.leatherBlack,
  borderRadius: "0.5rem",
  padding: "0.2rem 0.3rem 0.2rem 0.3rem",
  alignItems: "center",
  "&:hover": {
    background: colors.wineRed,
    color: colors.eggShellWhite,
    cursor: "pointer"
  }
}))
