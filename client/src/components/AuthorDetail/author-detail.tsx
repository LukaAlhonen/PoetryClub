import { useFragment, type FragmentType } from "../../__generated__";
import { AUTHOR_DETAIL_FRAGMENT } from "./author-detail.graphql";
import { dateFormatter } from "../../utils/formatters";
import styled from "@emotion/styled";
import colors from "../../colors";
import { Link } from "react-router-dom";
import FollowButton from "../../containers/FollowButton/follow-button";

import UserSVG from "../../assets/icons/user.svg?react";
import CalendarSVG from "../../assets/icons/calendar.svg?react";
import UsersSVG from "../../assets/icons/users.svg?react";
import { useAuth } from "../../context/use-auth";

interface AuthorDetailProps {
  author?: FragmentType<typeof AUTHOR_DETAIL_FRAGMENT>;
  isFollowed?: boolean;
}

const AuthorDetail = (props: AuthorDetailProps) => {
  const { user } = useAuth();
  const author = useFragment(AUTHOR_DETAIL_FRAGMENT, props.author);
  const date = author?.dateJoined ? dateFormatter(author.dateJoined) : "";
  console.log(props.isFollowed)
  return (
    <AuthorDetailContainer>
      <HeaderContainer>
        <UserNameContainer>
          <UserIcon />
          {author?.username ? author.username : "loading..."}
        </UserNameContainer>
        <DateContainer>Joined<CalendarIcon />{date}</DateContainer>
      </HeaderContainer>
      <FooterContainer>
        <StatsContainer>
          <StatContainer to={author?.username ? `/author/${author.username}/followers` : "#"}>
            {author?.followedByCount !== undefined && author?.followedByCount >= 0
              ?
                <><UsersIcon />{author.followedByCount} <StatLinkContainer>Followers</StatLinkContainer></>
              :
                null
            }
          </StatContainer>
          <StatContainer to={author?.username ? `/author/${author.username}/following` : "#"}>
            {author?.followingCount !== undefined && author?.followingCount >= 0
              ?
                <><UsersIcon />{author.followingCount} <StatLinkContainer>Following</StatLinkContainer></>
              :
                null
            }
          </StatContainer>
        </StatsContainer>
        {author?.username && user && user !== author.username && !props.isFollowed && <FollowButton followingId={author?.id} />}
      </FooterContainer>
    </AuthorDetailContainer>
  )
}

export default AuthorDetail;

const AuthorDetailContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "0.5em",
  boxSizing: "border-box",
  border: "0.15rem solid gray",
  padding: "2.5em",
  margin: "1em",
  background: colors.textEggshell,
  color: colors.backgroundBlack
})

const HeaderContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
})

const UserNameContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: "1.5em",
  marginRight: "auto",
  marginBottom: "1rem",
  paddingBottom: "0.5rem",
  width: "100%",
  borderBottom: `0.15rem solid gray`
})

const UserIcon = styled(UserSVG)({
  width: "1.5em",
  height: "1.5em",
  marginRight: "0.2em",
  "& path": {
    fill: colors.backgroundBlack
  }
})

const DateContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  marginRight: "auto"
})

const CalendarIcon = styled(CalendarSVG)({
  width: "1em",
  height: "1em",
  margin: "0 0.5em 0 0.5em",
  "& path": {
    fill: colors.wineRed
  }
})

const FooterContainer = styled.div({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "end"
})

const StatsContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  marginTop: "5em",
  width: "100%",
  alignItems: "center"
})

const StatContainer = styled(Link)({
  textDecoration: "none",
  display: "flex",
  flexDirection: "row",
  marginRight: "3em",
  fontWeight: "bold",
  color: colors.backgroundBlack,
  transition: "color 0.1s ease-in-out",
  "&:hover": {
    color: colors.wineRed,
    cursor: "pointer",
  }
})

const StatLinkContainer = styled.div({
  color: colors.backgroundBlack,
  marginLeft: "0.2em",
  transition: "color 0.1s ease-in-out",
  "&:hover": {
    color: colors.wineRed,
  },
})

const UsersIcon = styled(UsersSVG)({
  width: "1em",
  height: "1em",
  marginRight: "0.2em",
  transition: "fill 0.1s ease-in-out",
  "& path": {
    fill: "currentcolor",
  }
})
