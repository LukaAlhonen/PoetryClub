import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/use-auth";
import colors from "../../colors";
import { useApolloClient } from "@apollo/client/react";
import { useState } from "react";
import LogoutButton from "../../containers/LogoutButton/logout-button";

import HomeSVG from "../../assets/icons/home.svg?react";
import SearchSVG from "../../assets/icons/search.svg?react";
import ComposeSVG from "../../assets/icons/plus.svg?react";
import UserSVG from "../../assets/icons/user.svg?react";
import SignupSVG from "../../assets/icons/user-add.svg?react";
import LogoutSVG from "../../assets/icons/exit.svg?react";
import CollapsedSVG from "../../assets/icons/collapsed.svg?react";

const LeftNav = () => {
  const [collapsed, setCollapsed] = useState(() => {
    // idiotic hack to persist collapsed state accross page reloads (i do not like this)
    return localStorage.getItem("collapsed") === "true"
  });
  const { user, logout } = useAuth();
  const client = useApolloClient();
  const handleLogout = () => {
    client.clearStore().then(() => {
      logout();
    })
  }
  const handleCollapse = () => {
    setCollapsed(prev => {
      localStorage.setItem("collapsed", String(!prev));
      return !prev;
    })
  }
  return (
    <NavContainer collapsed={collapsed}>
      <CollapseContainer>
        <CollapseButton onClick={handleCollapse}>
          {/*{collapsed ? <CollapsedIcon /> : <ExpandedIcon />}*/}
          <CollapsedIcon />
        </CollapseButton>
      </CollapseContainer>
      <TopNav>
        <NavButton data-testid={"home-link"} to="/">
          <HomeIcon />
          {!collapsed && "Home"}
        </NavButton>
        <NavButton data-testid={"search-link"} to="/search">
          <SearchIcon />
          {!collapsed && "Search"}
        </NavButton>
        {user ? (
        <NavButton data-testid={"compose-link"} to="/compose">
          <ComposeIcon />
            {!collapsed && "New Poem"}
        </NavButton>
        ): (<></>)}
      </TopNav>
      <BottomNav>
        { user ? (
          <>
            <NavButton data-testid={"profile-link"} to={`/author/${user}`}>
              <UserIcon />
              {!collapsed && <UsernameContainer>{user}</UsernameContainer>}
            </NavButton>
            {/*<NavButton data-testid={"logout-link"} onClick={handleLogout} to="/">*/}
            <LogoutButton onLogout={handleLogout}>
              <LogoutIcon/>
              {!collapsed && "Logout"}
            </LogoutButton>
            {/*</NavButton>*/}
          </>
        ) : (
          <>
              <NavButton data-testid={"signup-link"} to="/signup"><SignupIcon />{!collapsed && "Signup"}</NavButton>
              <NavButton data-testid={"login-link"} to="/login"><UserIcon />{!collapsed && "Login"}</NavButton>
          </>
        )
        }
      </BottomNav>
    </NavContainer>
  );
};

export default LeftNav;

const NavContainer = styled.div<{ collapsed: boolean }>(({ collapsed }) => ({
  display: "flex",
  flexDirection: "column",
  top: 0,
  alignSelf: "stretch",
  zIndex: 10,
  flexGrow: 1,
  width: collapsed ? "4.5rem" : "12rem",
  border: "0.15rem solid gray",
  borderRadius: "0.5rem",
  margin: "0.7rem 0 0.7rem 0.7rem",
  transition: "width 0.2s ease-in-out",
}));

const TopNav = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
  padding: "0.7em 0.7em 0 0.7em",
});

const BottomNav = styled.div({
  marginTop: "auto",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
  padding: "0.7em 0.7em 0 0.7em",
});

const CollapseContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  borderBottom: "0.15rem solid gray",
  padding: "0.5em 0.5em 0.5rem 0.5em",
  alignItems: "left"
})

const CollapseButton = styled.button({
  textDecoration: "none",
  color: colors.textEggshell,
  border: "none",
  background: "none",
  alignItems: "center",
  display: "flex",
  marginLeft: "0.33rem",
  "&:hover": {
    cursor: "pointer",
    color: colors.wineRed
  }
})

const NavButton = styled(NavLink)({
  textDecoration: "none",
  textWrap: "nowrap",
  overflow: "hidden",
  width: "100%",
  color: colors.backgroundBlack,
  background: colors.textEggshell,
  marginBottom: "1em",
  padding: "0.5em",
  display: "flex",
  alignItems: "center",
  // justifyContent: "center",
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

const CollapsedIcon = styled(CollapsedSVG)({
  width: "2em",
  height: "2em",
  fill: "currentcolor",
  flexShrink: 0,
})

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
