import type { FragmentType } from "../../__generated__"
import { useFragment } from "../../__generated__";
import styled from "@emotion/styled";
import UserSVG from "../../assets/icons/user.svg?react";
import colors from "../../colors";
import { FOLLOWED_AUTHOR_FRAGMENT } from "./followed-author.graphql";

interface FollowedAuthorProps {
  author?: FragmentType<typeof FOLLOWED_AUTHOR_FRAGMENT>;
  isLoading?: boolean;
}

const FollowedAuthor = (props: FollowedAuthorProps) => {
  const author = useFragment(FOLLOWED_AUTHOR_FRAGMENT, props.author);

  return (
    <FollowedAuthorContainer>
      <UserIcon />
      {author?.username ? author.username : "loading..."}
    </FollowedAuthorContainer>
  )
}

export default FollowedAuthor;

const FollowedAuthorContainer = styled.div({
  background: colors.textEggshell,
  color: colors.backgroundBlack,
  display: "flex",
  flexDirection: "row",
  padding: "1rem",
  margin: "1rem",
  boxSizing: "border-box",
  border: "0.15rem solid gray",
  borderRadius: "0.5rem",
})

const UserIcon = styled(UserSVG)({
  width: "0.5rem",
  height: "0.5rem",
  marginRight: "0.2rem"
})
