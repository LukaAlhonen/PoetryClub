import styled from "@emotion/styled";
import { Link } from "react-router-dom";
// import colors from "../colors";

const Header = () => {
  return (
    <HeaderContainer>
      <LeftNav>
        <NavButtonContainer to="/">Home</NavButtonContainer>
        <NavButtonContainer to="/compose">Compose</NavButtonContainer>
        <NavButtonContainer to="/search">Search</NavButtonContainer>
      </LeftNav>
      <RightNav>
        <NavButtonContainer to="/">Profile</NavButtonContainer>
        <NavButtonContainer to="/login">Login</NavButtonContainer>
      </RightNav>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingLeft: "20px",
  paddingRight: "20px",
  position: "sticky",
  zIndex: "9",
  top: "0",
});

const LeftNav = styled.div({
  display: "flex",
  flexDirection: "column",
  marginRight: "auto",
});

const RightNav = styled.div({
  display: "flex",
  flexDirection: "column",
});

const NavButtonContainer = styled(Link)({
  textDecoration: "none",
  color: "black",
});
