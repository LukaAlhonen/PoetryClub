import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import HomeIcon from "../assets/icons/home.svg?react";
import SearchIcon from "../assets/icons/search.svg?react";
import ComposeIcon from "../assets/icons/plus.svg?react";
import UserIcon from "../assets/icons/user.svg?react";
import BookMarksIcon from "../assets/icons/book-alt.svg?react";
import colors from "../colors";

const LeftNav = () => {
  return (
    <NavContainer>
      <TopNav>
        <NavLink to="/">
          <HomeButton />
          Home
        </NavLink>
        <NavLink to="/search">
          <SearchButton />
          Search
        </NavLink>
        <NavLink to="/compose">
          <ComposeButton />
          New Poem
        </NavLink>
      </TopNav>
      <BottomNav>
        <NavLink to="/">
          <BookMarksButton />
          Bookmarks
        </NavLink>
        <NavLink to="/login">
          <UserButton />
          Login
        </NavLink>
      </BottomNav>
    </NavContainer>
  );
};

export default LeftNav;

const NavContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  position: "sticky",
  top: 0,
  gridArea: "left-nav",
  alignSelf: "start",
  zIndex: 10,
  padding: "1em 1em 0 1em",
  // padding: "1em",
  height: "100%",
  borderRight: "2px solid gray",
});

const TopNav = styled.div({
  display: "flex",
  flexDirection: "column",
});

const BottomNav = styled.div({
  marginTop: "auto",
  display: "flex",
  flexDirection: "column",
});

const NavLink = styled(Link)({
  textDecoration: "none",
  color: colors.backgroundBlack,
  background: colors.textEggshell,
  marginBottom: "1em",
  padding: "0.5em",
  display: "flex",
  alignItems: "center",
  gap: "1em",
  boxSizing: "border-box",
  // border: `0.15em solid ${colors.textEggshell}`,
  borderRadius: "0.6em",
  transition: "color 0.1s ease-in-out, background 0.1s ease-in-out",
  "&:hover": {
    color: colors.textEggshell,
    background: colors.wineRed,
  },
});

const navImg = {
  width: "1.5em",
  height: "1.5em",
  fill: "currentcolor",
  transition: "fill 0.15s ease",
};

// Nav svg image styles
const HomeButton = styled(HomeIcon)({
  ...navImg,
});

const SearchButton = styled(SearchIcon)({
  ...navImg,
});

const ComposeButton = styled(ComposeIcon)({
  ...navImg,
});

const BookMarksButton = styled(BookMarksIcon)({
  ...navImg,
});

const UserButton = styled(UserIcon)({
  ...navImg,
});
