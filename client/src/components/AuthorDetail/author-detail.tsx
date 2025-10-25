import { useFragment, type FragmentType } from "../../__generated__";
import { AUTHOR_DETAIL_FRAGMENT } from "./author-detail.graphql";
import { dateFormatter } from "../../utils/formatters";
import styled from "@emotion/styled";
import colors from "../../colors";

import UserSVG from "../../assets/icons/user.svg?react";
import CalendarSVG from "../../assets/icons/calendar.svg?react";
import UsersSVG from "../../assets/icons/users.svg?react";
// import { Link } from "react-router-dom";

interface AuthorDetailProps {
  author?: FragmentType<typeof AUTHOR_DETAIL_FRAGMENT>;
}

const AuthorDetail = (props: AuthorDetailProps) => {
  const author = useFragment(AUTHOR_DETAIL_FRAGMENT, props.author);
  const date = author?.dateJoined ? dateFormatter(author.dateJoined) : "";
  return (
    <AuthorDetailContainer>
      <HeaderContainer>
        <UserNameContainer>
          <UserIcon />
          {author?.username ? author.username : "loading..."}
        </UserNameContainer>
        <DateContainer>Joined<CalendarIcon />{date}</DateContainer>
      </HeaderContainer>
      <StatsContainer>
        <StatContainer>
          {author?.followedByCount !== undefined && author?.followedByCount >= 0
            ?
              <><UsersIcon />{author.followedByCount} <StatLinkContainer>Followers</StatLinkContainer></>
            :
              null
          }
        </StatContainer>
        <StatContainer>
          {author?.followingCount !== undefined && author?.followingCount >= 0
            ?
              <><UsersIcon />{author.followingCount} <StatLinkContainer>Following</StatLinkContainer></>
            :
              null
          }
        </StatContainer>
      </StatsContainer>
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

const StatsContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  marginTop: "5em",
  width: "100%"
})

const StatContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  marginRight: "3em",
  fontWeight: "bold",
  color: colors.backgroundBlack,
  "&:hover": {
    color: colors.wineRed,
    cursor: "pointer",
    transition: "color 0.2s ease"
  }
})

const StatLinkContainer = styled.div({
  color: colors.backgroundBlack,
  marginLeft: "0.2em",
  position: "relative",
  backgroundImage: `linear-gradient(${colors.wineRed}, ${colors.wineRed})`,
  backgroundPosition: "0 100%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "0% 0.2em", // 👈 start hidden
  transition: "none",

  "&:hover": {
    transition: "color 0.2s ease, background-size 0.2s ease",
    backgroundSize: "100% 0.2em", // 👈 expands left → right
    color: colors.wineRed,
  },
})

const UsersIcon = styled(UsersSVG)({
  width: "1em",
  height: "1em",
  marginRight: "0.2em",
  "& path": {
    fill: "currentcolor",
    transition: "fill 0.2s ease"
  }
})
