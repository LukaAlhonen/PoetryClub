import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/use-auth";
import colors from "../../colors";
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
  const { user } = useAuth();
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
          <CollapsedIcon />
        </CollapseButton>
      </CollapseContainer>
      <TopNav>
        <NavButton data-testid={"home-link"} to="/">
          <HomeIcon />
          {"Home"}
        </NavButton>
        <NavButton data-testid={"search-link"} to="/search">
          <SearchIcon />
          {"Search"}
        </NavButton>
        {user ? (
        <NavButton data-testid={"compose-link"} to="/compose">
          <ComposeIcon />
            {"New Poem"}
        </NavButton>
        ): (<></>)}
      </TopNav>
      <BottomNav>
        { user ? (
          <>
            <NavButton data-testid={"profile-link"} to={`/author/${user}`}>
              <UserIcon />
              {<UsernameContainer>{user}</UsernameContainer>}
            </NavButton>
            <LogoutButton>
              <LogoutIcon/>
              {"Logout"}
            </LogoutButton>
          </>
        ) : (
          <>
              <NavButton data-testid={"signup-link"} to="/signup"><SignupIcon />{"Signup"}</NavButton>
              <NavButton data-testid={"login-link"} to="/login"><UserIcon />{"Login"}</NavButton>
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
  justifyItems: "center",
  zIndex: 10,
  flexGrow: 1,
  width: collapsed ? "3.5rem" : "12rem",
  transition: "width 0.2s ease-in-out",
  padding: "1rem",
}));

const TopNav = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
});

const BottomNav = styled.div({
  marginTop: "auto",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
});

const CollapseContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  marginBottom: "1rem",
  // marginTop: "0.5rem",
  alignItems: "left"
})

const CollapseButton = styled.button({
  textDecoration: "none",
  color: colors.eggShellWhite,
  border: "none",
  background: "none",
  alignItems: "center",
  margin: 0,
  padding: 0,
  display: "flex",
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
  color: colors.eggShellWhite,
  marginTop: "1em",
  display: "flex",
  alignItems: "end",
  gap: "1em",
  boxSizing: "border-box",
  transition: "color 0.1s ease-in-out, background 0.1s ease-in-out",
  "&:hover": {
    color: colors.wineRed,
  },
  "&.active": {
    color: colors.wineRed,
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
  width: "1.8em",
  height: "1.8em",
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
  width: "1.5em",
  height: "1.5em",
  fill: "currentcolor",
  transition: "fill 0.15s ease",
  flexShrink: 0,
  // ...navImg,
});

const SignupIcon = styled(SignupSVG)({
  ...navImg,
})

const LogoutIcon = styled(LogoutSVG)({
  ...navImg
})
