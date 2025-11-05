import { Link } from "react-router-dom";
import { useAuth } from "../../context/use-auth";
import { LOGOUT } from "./logout-button.graphql";
import colors from "../../colors";
import styled from "@emotion/styled";
import { useMutation } from "@apollo/client/react";

const LogoutButton = (props: { children: React.ReactNode;  onLogout: () => void}) => {
  const { user } = useAuth();

  const [logoutMutation] = useMutation(LOGOUT)

  const handleLogout = () => {
    if (user) {
      props.onLogout();
      logoutMutation();
    }
  }

  return (
    <LogoutButtonContainer data-testid={"logout-link"} onClick={handleLogout} to={"/"}>
      {props.children}
    </LogoutButtonContainer>
  )
}

export default LogoutButton;

const LogoutButtonContainer = styled(Link)({
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
})
