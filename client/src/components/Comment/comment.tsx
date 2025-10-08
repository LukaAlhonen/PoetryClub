import { COMMENT_FRAGMENT } from "./comment.graphql";
import { useFragment, type FragmentType } from "../../__generated__";
import styled from "@emotion/styled";
import colors from "../../colors";
import { Link } from "react-router-dom";
import UserIcon from "../../assets/icons/user.svg?react";
import { dateFormatter } from "../../utils/formatters";

interface CommentProps {
  comment?: FragmentType<typeof COMMENT_FRAGMENT>
}

const Comment = (props: CommentProps) => {
  const comment = useFragment(COMMENT_FRAGMENT, props.comment)
  const date = comment? dateFormatter(comment.datePublished) : "loading..."

  return (
    <div>
      <CommentContainer>
        <CommentHeader>
          <AuthorContainer to="/"><UserButton />{comment?.author.username}</AuthorContainer>
          {date}
        </CommentHeader>
        <TextContainer>
          {comment?.text}
        </TextContainer>
      </CommentContainer>
    </div>
  )
}

export default Comment;

const CommentContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  // padding: "0.5em",
  marginBottom: "1em",
  width: "100%",
  minWidth: "10em",
  background: colors.textEggshell,
  color: colors.backgroundBlack,
  borderRadius: "0.5em"
})

const CommentHeader = styled.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  borderBottom: "0.15em solid gray",
  padding: "0.5em",
  alignItems: "center",
  fontSize: "0.8em"
})

const AuthorContainer = styled(Link)({
  textDecoration: "none",
  boxSizing: "border-box",
  padding: "0.2em",
  borderRadius: "0.5em",
  color: colors.backgroundBlack,
  background: colors.textEggshell,
  justifyContent: "space-between",
  transition: "color 0.2s ease, border 0.2s ease, background 0.2s ease",
  marginRight: "1em",
  fontWeight: "bold",
  alignItems: "center",
  display: "flex",
  border: `0.15em solid ${colors.backgroundBlack}`,
  "&:hover": {
    color: colors.textEggshell,
    border: `0.15em solid ${colors.wineRed}`,
    background: colors.wineRed
  },
  "&:hover path": {
    fill: colors.textEggshell
  },
});

const UserButton = styled(UserIcon)({
  height: "1.5em",
  width: "1.5em",
  transition: "fill 0.2s ease",
  margin: "0 0.5em 0 0",
  "& path": {
    fill: colors.backgroundBlack,
    transition: "fill 0.2s ease"
  }
});

const TextContainer = styled.div({
  display: "flex",
  padding: "0.5em"
})
