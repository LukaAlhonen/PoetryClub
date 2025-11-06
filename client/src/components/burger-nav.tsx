import styled from "@emotion/styled";
import colors from "../colors";
import { useState } from "react";
import Hamburger from "hamburger-react";

const BurgerNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavContainer>
      <BurgerContainer>
        <Hamburger toggled={isOpen} toggle={setIsOpen} size={30} color={colors.backgroundBlack} />
      </BurgerContainer>
      <LinksContainer isOpen={isOpen}>
        <NavLink>Home</NavLink>
        <NavLink>Search</NavLink>
        <NavLink>Login</NavLink>
      </LinksContainer>
    </NavContainer>
  )
}

export default BurgerNav;

const NavContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  zIndex: 10,
  position: "absolute",
  marginTop: "0.5rem",
  marginLeft: "0.5rem",
  width: "fit-content"
})

const LinksContainer = styled.div<{isOpen: boolean}>(({isOpen}) => ({
  display: "flex",
  flexDirection: "column",
  padding: isOpen ? "0.5rem" : "0",
  border: isOpen ? "0.15rem solid gray" : "none",
  borderRadius: "0.5rem",
  background: colors.backgroundBlack,
  position: "absolute",
  top: "3rem",
  // display: collapsed ? "none" : "flex"
  height: isOpen ? "auto" : 0,
  overflow: "hidden",
  boxSizing: "border-box",
  transition: "height 0.2s ease-in-out"
}))

const NavLink = styled.div({
  color: colors.textEggshell
})

const BurgerContainer = styled.div({
  background: colors.textEggshell,
  padding: "0",
  border: "0.15rem solid gray",
  borderRadius: "0.5rem"
})
