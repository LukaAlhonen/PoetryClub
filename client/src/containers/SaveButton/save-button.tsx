import { useMutation } from "@apollo/client/react"
import { CREATE_SAVED_POEM, REMOVE_SAVED_POEM } from "./save-button.graphql"
import type { CreateSavedPoemMutation, CreateSavedPoemMutationVariables } from "../../__generated__/graphql";
import styled from "@emotion/styled";
import colors from "../../colors";
import { useAuth } from "../../context/use-auth";
import { useEffect, useState } from "react";
import type { RemoveSavedPoemMutation, RemoveSavedPoemMutationVariables } from "../../__generated__/types";
import { GET_AUTHOR } from "../../pages/Author/author.graphql";
import { useHandleError } from "../../utils/error-handler";

interface SaveButtonProps {
  poemId?: string;
  children: React.ReactNode;
  savedByCurrentUser?: CreateSavedPoemMutation["createSavedPoem"] | null;
}

const SaveButton = (props: SaveButtonProps) => {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(props.savedByCurrentUser ? true : false);
  const handleError = useHandleError();
  const [createSavedPoemMutation, { loading: createLoading }] = useMutation<CreateSavedPoemMutation, CreateSavedPoemMutationVariables>(CREATE_SAVED_POEM, {
    onError(error) {
      handleError({ error });
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
        if (data?.createSavedPoem && props.poemId) {
          const poemRef = cache.identify({ __typename: "Poem", id: props.poemId });
          const newSavedPoem = data.createSavedPoem;
          const newNode = { node: newSavedPoem, cursor: newSavedPoem.id };
          if (cachedAuthor) {

            cache.writeQuery({
              query: GET_AUTHOR,
              variables: { username: user, poemsLimit: 5, savedPoemsLimit: 5, likedPoemsLimit: 5, followedByLimit: 10, followingLimit: 10 },
              data: {
                ...cachedAuthor,
                authorByUsername: {
                  ...cachedAuthor?.authorByUsername,
                  savedPoems: {
                    edges: [newNode, ...cachedAuthor.authorByUsername.savedPoems.edges],
                    pageInfo: cachedAuthor.authorByUsername.savedPoems.pageInfo
                  }
                }
              }
            })

          }
          cache.modify({
            id: poemRef,
            fields: {
              savedByCurrentUser() { return newSavedPoem },
            }
          })
        }
      }
    },
  });

  const [removeSavedPoemMutation, { loading: removeLoading }] = useMutation<RemoveSavedPoemMutation, RemoveSavedPoemMutationVariables>(REMOVE_SAVED_POEM, {
    onError(error) {
      handleError({ error });
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
        if (cachedAuthor && data?.removeSavedPoem && props.poemId) {
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
                savedPoems: {
                  edges: cachedAuthor.authorByUsername.savedPoems.edges.filter((edge) => (
                    edge?.node?.id !== data.removeSavedPoem.id
                  )),
                  pageInfo: cachedAuthor.authorByUsername.savedPoems.pageInfo
                }
              }
            }
          })
        }
        cache.modify({
          id: cache.identify({ __typename: "Poem", id: props.poemId }),
          fields: {
            savedByCurrentUser() { return null },
            savedByCount(existingCount = 0) {
              return existingCount - 1;
            }
          }
        })
      }
    },
  })

  useEffect(() => {
    if (!user) setIsSaved(false);
  }, [user])

  useEffect(() => {
    setIsSaved(!!props.savedByCurrentUser);
  }, [props.savedByCurrentUser])

  const handleClick = () => {
    if (props.poemId && !createLoading && !removeLoading && user) {
      if (!isSaved) {
        setIsSaved(true);
        createSavedPoemMutation({ variables: { poemId: props.poemId } })
      } else if (isSaved && props.savedByCurrentUser?.id) {
        setIsSaved(false);
        removeSavedPoemMutation({ variables: { savedPoemId: props.savedByCurrentUser.id } })
      }
    }
  }

  return (
    <SaveButtonContainer data-testid={`save-button-${props.poemId}`} onClick={handleClick} isSaved={isSaved}>
      {props.children}
    </SaveButtonContainer>
  )
}

export default SaveButton;

const SaveButtonContainer = styled.div<{
  isSaved?: boolean,
}>(({
  isSaved,
}) => ({
  display: "flex",
  height: "2.1rem",
  minWidth: "3.2rem",
  border: "0.15rem solid gray",
  background: isSaved ? colors.wineRed : colors.textEggshell,
  color: isSaved ? colors.textEggshell : colors.backgroundBlack,
  borderRadius: "0.5rem",
  padding: "0.2rem 0.3rem 0.2rem 0.3rem",
  alignItems: "center",
  "&:hover": {
    background: colors.wineRed,
    color: colors.textEggshell,
    cursor: "pointer"
  }
}))
