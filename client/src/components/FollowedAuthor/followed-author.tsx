import type { FragmentType } from "../../__generated__"
import { useFragment } from "../../__generated__";
import styled from "@emotion/styled";
import UserSVG from "../../assets/icons/user.svg?react";
import colors from "../../colors";
import { FOLLOWED_AUTHOR_FRAGMENT } from "./followed-author.graphql";
import { Link } from "react-router-dom";

interface FollowedAuthorProps {
  author?: FragmentType<typeof FOLLOWED_AUTHOR_FRAGMENT>;
  isLoading?: boolean;
}

const FollowedAuthor = (props: FollowedAuthorProps) => {
  const author = useFragment(FOLLOWED_AUTHOR_FRAGMENT, props.author);

  return (
    <FollowedAuthorContainer>
      <AuthorContainer data-testid={`followed-author-link-${author?.id}`} to={author?.username ? `/author/${author.username}` : "#"}>
        <UserIcon />
        {author?.username ? author.username : "loading..."}
      </AuthorContainer>
    </FollowedAuthorContainer>
  )
}

export default FollowedAuthor;

const FollowedAuthorContainer = styled.div({
  background: colors.eggShellWhite,
  color: colors.leatherBlack,
  display: "flex",
  flexDirection: "row",
  boxSizing: "border-box",
  border: "0.15rem solid gray",
  borderRadius: "0.5rem",
  padding: "1rem",
  margin: "1rem",
})

const AuthorContainer = styled(Link)({
  display: "flex",
  flexDirection: "row",
  textDecoration: "none",
  fontWeight: "bold",
  color: colors.leatherBlack,
  alignItems: "center",
  transition: "color 0.1s ease-in-out",
  "&:hover": {
    color: colors.wineRed
  }
})

const UserIcon = styled(UserSVG)({
  width: "1rem",
  height: "1rem",
  marginRight: "0.2rem",
  "& path": {
    fill: "currentcolor"
  }
})
