import styled from "@emotion/styled";
import colors from "../colors";
import { useState } from "react";
import Hamburger from "hamburger-react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/use-auth";
import LogoutButton from "../containers/LogoutButton/logout-button";

import HomeSVG from "../assets/icons/home.svg?react";
import SearchSVG from "../assets/icons/search.svg?react";
import ComposeSVG from "../assets/icons/plus.svg?react";
import SignupSVG from "../assets/icons/user-add.svg?react";
import LogoutSVG from "../assets/icons/exit.svg?react";
import UserSVG from "../assets/icons/user.svg?react";

const BurgerNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  return (
    <NavContainer>
      <HeaderContainer>
        <Hamburger toggled={isOpen} toggle={setIsOpen} size={30} color={colors.eggShellWhite} />
        <TitleContainer to={"/"}>PoetryClub</TitleContainer>
        {user && <UserButton to={`/author/${user}`}><UserIcon /></UserButton>}
      </HeaderContainer>
      <LinksContainer isOpen={isOpen}>
        <TopLinks>
          <NavButton to={"/"} end><HomeIcon />Home</NavButton>
          <NavButton to={"/search"}><SearchIcon />Search</NavButton>
          {user && <NavButton to={"/compose"}><ComposeIcon />Compose</NavButton>}
        </TopLinks>
        <BottomLinks>
          {
            user ?
            <>
            <LogoutButton
              style={
                  {
                    color: colors.eggShellWhite,
                    textDecoration: "none",
                    padding: "0.5rem",
                    border: `0.10rem solid ${colors.darkGray}`,
                    background: colors.test,
                    borderRadius: "0.3rem",
                    alignItems: "center",
                    display: "flex",
                    gap: "0.5rem"
                  }
              }
            >
              <LogoutIcon /> Logout
            </LogoutButton>
            </>
            :
            <>
              <NavButton to={"/signup"}><SignupIcon />Signup</NavButton>
              <NavButton to={"/login"}><LoginIcon />Login</NavButton>
            </>
          }
        </BottomLinks>
      </LinksContainer>
    </NavContainer>
  )
}

export default BurgerNav;

const NavContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  zIndex: 10,
  position: "fixed",
  background: colors.bg3,
  width: "100%",
  borderBottom: `0.10rem solid ${colors.darkGray}`,
  boxSizing: "border-box",
  height: "3rem"
})

const HeaderContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between"
})

const LinksContainer = styled.div<{isOpen: boolean}>(({isOpen}) => ({
  display: isOpen ? "flex" : "none",
  flexDirection: "column",
  padding: "0.5rem",
  background: colors.bg3,
  position: "fixed",
  top: "3rem",
  width: "100%",
  height: "calc(100vh - 3rem)",
  overflow: "hidden",
  boxSizing: "border-box",
  justifyContent: "space-between",
  pointerEvents: isOpen ? "auto" : "none"
}))

const TopLinks = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem"
})

const BottomLinks = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem"
})

const NavButton = styled(NavLink)({
  color: colors.eggShellWhite,
  background: colors.test,
  textDecoration: "none",
  padding: "0.5rem",
  border: `0.10rem solid ${colors.darkGray}`,
  borderRadius: "0.3rem",
  "&.active": {
    color: colors.eggShellWhite,
    background: colors.wineRed
  },
  alignItems: "center",
  display: "flex",
  gap: "0.5rem"
})

const TitleContainer = styled(Link)({
  color: colors.eggShellWhite,
  textDecoration: "none",
  position: "absolute",   // allow it to be centered
  left: "50%",
  transform: "translateX(-50%)",
  fontWeight: "bold",
  fontSize: "1.5em",
})

const svgStyles = {
  width: "1.5rem",
  height: "1.5rem",
  "& path": {
    fill: "currentcolor"
  }
}

const LogoutIcon = styled(LogoutSVG)({
  ...svgStyles,
})

const HomeIcon = styled(HomeSVG)({
  ...svgStyles
})

const SearchIcon = styled(SearchSVG)({
  ...svgStyles
})

const LoginIcon = styled(UserSVG)({
  ...svgStyles,
})

const SignupIcon = styled(SignupSVG)({
  ...svgStyles,
})

const ComposeIcon = styled(ComposeSVG)({
  ...svgStyles,
})

const UserButton = styled(NavLink)({
  border: "none",
  textDecoration: "none",
  color: colors.eggShellWhite,
  "&.active": {
    color: colors.wineRed
  }
})

const UserIcon = styled(UserSVG)({
  width: "1.5rem",
  height: "1.5rem",
  "& path": {
    fill: "currentcolor"
  },
  marginRight: "0.7rem"
})
