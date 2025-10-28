import { COMMENT_FRAGMENT } from "./comment.graphql";
import { useFragment, type FragmentType } from "../../__generated__";
import styled from "@emotion/styled";
import colors from "../../colors";
import { Link } from "react-router-dom";
import UserIcon from "../../assets/icons/user.svg?react";
import { dateFormatter } from "../../utils/formatters";
import Spinner from "../spinner";

interface CommentProps {
  comment?: FragmentType<typeof COMMENT_FRAGMENT>;
  isLoading?: boolean;
  noMargin?: boolean;
}

const Comment = (props: CommentProps) => {
  const comment = useFragment(COMMENT_FRAGMENT, props.comment)
  const date = comment? dateFormatter(comment.datePublished) : "loading..."


  return (
    <CommentContainer noMargin={props.noMargin}>
      { props.isLoading
        ?
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        :
        <>
          <CommentHeader>
            <AuthorContainer to={comment?.author?.username ? `/author/${comment.author.username}` : "#"}><UserButton />{comment?.author.username}</AuthorContainer>
            {date}
          </CommentHeader>
          <TextContainer>
            {comment?.text}
          </TextContainer>
        </>
      }
    </CommentContainer>
  )
}

export default Comment;

const CommentContainer = styled.div<{ noMargin?: boolean}>(
  ({noMargin}) => ({
    display: "flex",
    flexDirection: "column",
    marginBottom: noMargin ? "0" : "1em",
    width: "100%",
    maxWidth: "60%",
    background: colors.textEggshell,
    color: colors.backgroundBlack,
    borderRadius: "0.5em",
    boxSizing: "border-box",
    border: "0.15em solid gray",
    justifySelf: "left",
    whiteSpace: "pre-wrap",
  })
);

const CommentHeader = styled.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  borderBottom: "0.15em solid gray",
  padding: "0.5em",
  alignItems: "center",
  fontSize: "0.9em"
})

const AuthorContainer = styled(Link)({
  textDecoration: "none",
  boxSizing: "border-box",
  padding: "0.5em",
  borderRadius: "0.5em",
  color: colors.backgroundBlack,
  background: colors.textEggshell,
  justifyContent: "space-between",
  transition: "color 0.1s ease-in-out, background 0.1s ease-in-out",
  marginRight: "1em",
  fontWeight: "bold",
  alignItems: "center",
  display: "flex",
  border: `0.15em solid gray`,
  "&:hover": {
    color: colors.textEggshell,
    background: colors.wineRed
  },
  "&:hover path": {
    fill: colors.textEggshell
  },
});

const UserButton = styled(UserIcon)({
  height: "1.5em",
  width: "1.5em",
  transition: "fill 0.1s ease-in-out",
  margin: "0 0.2em 0 0",
  "& path": {
    fill: colors.backgroundBlack,
    transition: "fill 0.1s ease-in-out"
  }
});

const TextContainer = styled.div({
  display: "flex",
  padding: "2em 1em 2em 1em"
})

const SpinnerContainer = styled.div({
  display: "flex",
  margin: "2em",
  justifyContent: "center"
})
