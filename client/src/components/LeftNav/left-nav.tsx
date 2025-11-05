import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/use-auth";

import HomeSVG from "../../assets/icons/home.svg?react";
import SearchSVG from "../../assets/icons/search.svg?react";
import ComposeSVG from "../../assets/icons/plus.svg?react";
import UserSVG from "../../assets/icons/user.svg?react";
import SignupSVG from "../../assets/icons/user-add.svg?react";
import LogoutSVG from "../../assets/icons/exit.svg?react";
import colors from "../../colors";
import { useApolloClient } from "@apollo/client/react";
import LogoutButton from "../../containers/LogoutButton/logout-button";
// import { GET_POEMS } from "../../pages/Poems/poems.graphql";

const LeftNav = () => {
  const { user, logout } = useAuth();
  const client = useApolloClient();
  const handleLogout = () => {
    client.clearStore().then(() => {
      logout();
    })
  }
  return (
    <NavContainer>
      <TopNav>
        <NavButton data-testid={"home-link"} to="/">
          <HomeIcon />
          Home
        </NavButton>
        <NavButton data-testid={"search-link"} to="/search">
          <SearchIcon />
          Search
        </NavButton>
        {user ? (
        <NavButton data-testid={"compose-link"} to="/compose">
          <ComposeIcon />
          New Poem
        </NavButton>
        ): (<></>)}
      </TopNav>
      <BottomNav>
        { user ? (
          <>
            <NavButton data-testid={"profile-link"} to={`/author/${user}`}>
              <UserIcon />
              <UsernameContainer>{user}</UsernameContainer>
            </NavButton>
            {/*<NavButton data-testid={"logout-link"} onClick={handleLogout} to="/">*/}
            <LogoutButton onLogout={handleLogout}>
              <LogoutIcon/>
              Logout
            </LogoutButton>
            {/*</NavButton>*/}
          </>
        ) : (
          <>
            <NavButton data-testid={"signup-link"} to="/signup"><SignupIcon />Signup</NavButton>
            <NavButton data-testid={"login-link"} to="/login"><UserIcon />Login</NavButton>
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

const NavButton = styled(NavLink)({
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
  border: "0.15em solid gray",
  borderRadius: "0.5em",
  transition: "color 0.1s ease-in-out, background 0.1s ease-in-out",
  "&:hover": {
    color: colors.textEggshell,
    background: colors.wineRed,
  },
  "&.active": {
    color: colors.textEggshell,
    background: colors.wineRed,
  }
});

const UsernameContainer = styled.div({
  fontSize: "clamp(0.1rem, 0.9em, 1rem)",
  flexShrink: 1,
  minWidth: 0,
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
})

const navImg = {
  width: "1.5em",
  height: "1.5em",
  fill: "currentcolor",
  transition: "fill 0.15s ease",
  flexShrink: 0,
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

const UserIcon = styled(UserSVG)({
  ...navImg,
});

const SignupIcon = styled(SignupSVG)({
  ...navImg
})

const LogoutIcon = styled(LogoutSVG)({
  ...navImg
})
