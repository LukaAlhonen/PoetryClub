import { Link } from "react-router-dom";
import { useAuth } from "../../context/use-auth";
import { LOGOUT } from "./logout-button.graphql";
import colors from "../../colors";
import styled from "@emotion/styled";
import { useMutation } from "@apollo/client/react";
import { notify } from "../../utils/notify";
import { useHandleError } from "../../utils/error-handler";

const LogoutButton = (props: { children: React.ReactNode;  onLogout: () => void}) => {
  const { user } = useAuth();
  const handleError = useHandleError();

  const [logoutMutation] = useMutation(LOGOUT, {
    onCompleted(){
      notify("🫶 smell ya' later")
    },
    onError(error) {
      handleError({ error });
    }
  })

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
  // width: "9em",
  width: "100%",
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
