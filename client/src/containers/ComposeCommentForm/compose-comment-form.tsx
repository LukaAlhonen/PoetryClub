import { useMutation } from "@apollo/client/react/compiled";
import { CREATE_COMMENT } from "./compose-comment-form.graphql";
import type { CreateCommentMutation, CreateCommentMutationVariables } from "../../__generated__/graphql";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import colors from "../../colors";
import { GET_POEM } from "../../pages/Poem/poem.graphql";
import { forwardRef } from "react";
import Comment from "../../components/Comment/comment";
import { notifySuccess } from "../../utils/notify";
import { useHandleError } from "../../utils/error-handler";

interface ComposeCommentFormProps {
  poemId: string;
}
// forwardRef<HTMLDivElement, CommentsSectionProps>((props, ref)
// const ComposeCommentForm = (props: ComposeCommentFormProps) => {
const ComposeCommentForm = forwardRef<HTMLDivElement, ComposeCommentFormProps>((props, ref) => {
  const [text, setText] = useState<string>("")
  const [isFilled, setIsFilled] = useState(text.trim() !== "");
  const handleError = useHandleError();


  const [createCommentMutation, { loading }] = useMutation<CreateCommentMutation, CreateCommentMutationVariables>(
    CREATE_COMMENT, {
      onCompleted() {
        notifySuccess("comment published!")
      },
      onError(error) {
        handleError({ error });
      },
      update(cache, { data }) {
        const cachedPoem = cache.readQuery({ query: GET_POEM, variables: { poemId: props.poemId, commentsLimit: 5} });
        if (cachedPoem && data) {
          const newNode = { node: data.createComment, cursor: data.createComment.id };
          cache.writeQuery({
            query: GET_POEM,
            variables: { poemId: props.poemId, commentsLimit: 5},
            data: {
              ...cachedPoem,
              poem: {
                ...cachedPoem.poem,
                comments: {
                  edges: [newNode, ...cachedPoem.poem.comments.edges],
                  pageInfo: cachedPoem.poem.comments.pageInfo
                }
              }
            }
          })
        }
        cache.modify({
          id: cache.identify({ __typename: "Poem", id: props.poemId }),
          fields: {
            commentsCount(existingCount = 0) {
              return existingCount + 1;
            },
          },
        });
      }
    }
  );

  useEffect(() => {
    setIsFilled(text.trim() !== "")
  }, [text])

  if (loading) {
    return (
      <ComposeCommentContainer ref={ref}>
        <FormContainer>
          <FormTextArea data-testid={"comment-text-input"} placeholder="Post a comment" rows={10} maxLength={1000} required={true} value={text} />
          <FormButton data-testid={"submit-comment-button"} disabled={!isFilled} isFilled={isFilled}>Post</FormButton>
        </FormContainer>
        <SkeletonContainer>
          <Comment data-testid={"comment-skeleton"} key={"skeleton_x"} isLoading={loading} noMargin={true} />
        </SkeletonContainer>
      </ComposeCommentContainer>
    )
  }

  return (
    <ComposeCommentContainer ref={ref}>
      <FormContainer onSubmit={(e) => {
        e.preventDefault();
        createCommentMutation({ variables: { poemId: props.poemId, text } });
        setText("");
      }}>
        <FormTextArea data-testid={"comment-text-input"} placeholder="Post a comment" rows={10} maxLength={1000} required={true} value={text} onChange={(e) => {
          setText(e.target.value)
        }} />
        <FormButton data-testid={"submit-comment-button"} disabled={!isFilled} isFilled={isFilled} type="submit" >Post</FormButton>
      </FormContainer>
    </ComposeCommentContainer>
  )
})

export default ComposeCommentForm;

const ComposeCommentContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  justifySelf: "center",
  width: "100%",
  maxWidth: "60em",
  // marginBottom: "1em"
})

const FormContainer = styled.form({
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
  borderRadius: "0.5em",
  border: "0.15em solid gray",
  background: colors.textEggshell,
  width: "60%",
  padding: "0.5em",
})

const FormTextArea = styled.textarea({
  padding: "0.5em",
  resize: "none",
  border: `0.15rem solid gray`,
  background: colors.textEggshell,
  marginBottom: "1em",
  boxSizing: "border-box",
  fontSize: "1.1em",
  borderRadius: "0.5em",
  "&:focus": {
    outline: "none",
    border: `0.15rem solid ${colors.wineRed}`
  },
  "&:hover": {
    border: `0.15rem solid ${colors.wineRed}`,
  }
})

const FormButton = styled.button<{isFilled?: boolean}>(({isFilled}) => ({
  padding: "0.5rem",
  fontSize: "1.1em",
  width: "50%",
  minWidth: "5em",
  fontWeight: "bold",
  textDecoration: "none",
  border: "0.15rem solid gray",
  borderRadius: "0.5rem",
  background: isFilled ? colors.wineRed : colors.backgroundBlack,
  color: colors.textEggshell,
  transition: "background 0.1s ease-in-out",
  "&:hover": {
    // background: colors.wineRed,
    cursor: isFilled ? "pointer" : "default"
  }
}));

const SkeletonContainer = styled.div({
  display: "flex",
  marginTop: "1em"
})
