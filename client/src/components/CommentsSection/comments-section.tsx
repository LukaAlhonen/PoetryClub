import styled from "@emotion/styled";
import Comment from "../Comment/comment";
import type { GetPoemQuery } from "../../__generated__/graphql";

interface CommentsSectionProps {
  comments?: GetPoemQuery["poem"]["comments"];
  isLoading?: boolean;
  pageSize?: number | null;
}

const CommentsSection = (props: CommentsSectionProps) => {
  return (
    <CommentsContainer>
      {props.comments?.edges?.map((edge) => (
        edge.node ? <Comment key={edge.node?.id} comment={edge.node} /> : null
      ))}
      {
        props.isLoading && props.pageSize
        ?
        Array.from({length: props.pageSize}).map((_, i) => (
          <Comment key={`skeleton_${i}`} isLoading={props.isLoading} />
        ))
        :
        null
      }
    </CommentsContainer>
  )
}

export default CommentsSection;

const CommentsContainer = styled.div({
  marginTop: "1em",
  display: "flex",
  width: "100%",
  height: "auto",
  maxWidth: "60em",
  flexDirection: "column",
  justifySelf: "center",
});
