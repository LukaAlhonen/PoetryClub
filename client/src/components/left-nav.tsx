import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useAuth } from "../context/use-auth";

import HomeSVG from "../assets/icons/home.svg?react";
import SearchSVG from "../assets/icons/search.svg?react";
import ComposeSVG from "../assets/icons/plus.svg?react";
import UserSVG from "../assets/icons/user.svg?react";
import BookMarksSVG from "../assets/icons/book-alt.svg?react";
import SignupSVG from "../assets/icons/user-add.svg?react";
import LogoutSVG from "../assets/icons/exit.svg?react";
import colors from "../colors";

const LeftNav = () => {
  const { user, logout } = useAuth();
  return (
    <NavContainer>
      <TopNav>
        <NavLink to="/">
          <HomeIcon />
          Home
        </NavLink>
        <NavLink to="/search">
          <SearchIcon />
          Search
        </NavLink>
        {user ? (
        <NavLink to="/compose">
          <ComposeIcon />
          New Poem
        </NavLink>
        ): (<></>)}
      </TopNav>
      <BottomNav>
        { user ? (
          <>
            <NavLink to="/">
              <BookMarksIcon />
              Bookmarks
            </NavLink>
            <NavLink to={`/author/${user}`}>
              <UserIcon />
              Profile
            </NavLink>
            <NavLink onClick={logout} to="/">
              <LogoutIcon/>
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/signup"><SignupIcon />Signup</NavLink>
            <NavLink to="/login"><UserIcon />Login</NavLink>
          </>
        )
        }
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
  width: "9em",
  color: colors.backgroundBlack,
  background: colors.textEggshell,
  marginBottom: "1em",
  padding: "0.5em",
  display: "flex",
  alignItems: "center",
  gap: "1em",
  boxSizing: "border-box",
  borderRadius: "0.5em",
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
const HomeIcon = styled(HomeSVG)({
  ...navImg,
});

const SearchIcon = styled(SearchSVG)({
  ...navImg,
});

const ComposeIcon = styled(ComposeSVG)({
  ...navImg,
});

const BookMarksIcon = styled(BookMarksSVG)({
  ...navImg,
});

const UserIcon = styled(UserSVG)({
  ...navImg,
});

const SignupIcon = styled(SignupSVG)({
  ...navImg
})

const LogoutIcon = styled(LogoutSVG)({
  ...navImg
})
