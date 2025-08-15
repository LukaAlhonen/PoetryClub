import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import colors from "../colors";

const Header = () => {
  return (
    <HeaderContainer>
      <div></div>
      <HomeButtonContainer to={"/"}>
        <h5>Home</h5>
      </HomeButtonContainer>
      <LoginButtonContainer to={"/login"}>
        <h5>Login</h5>
      </LoginButtonContainer>
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
  backgroundColor: colors.primary,
});

const HomeButtonContainer = styled(Link)({
  textDecoration: "none",
  color: "white",
});

const LoginButtonContainer = styled(Link)({
  textDecoration: "none",
  color: "white",
});
