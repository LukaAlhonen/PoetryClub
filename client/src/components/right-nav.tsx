import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import UserIcon from "../assets/icons/user.svg?react";

const RightNav = () => {
  return (
    <NavContainer>
      <UserContainer />
    </NavContainer>
  );
};

export default RightNav;

const NavContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  position: "sticky",
  top: 0,
  gridArea: "right-nav",
  zIndex: 10,
  alignItems: "center",
  margin: "2em",
});

const NavLink = styled(Link)({
  textDecoration: "none",
  color: "black",
});

const UserContainer = styled(UserIcon)({
  width: "2em",
  height: "2em",
});
