import { Link } from "react-router-dom";
import { useAuth } from "../../context/use-auth";
import { LOGOUT } from "./logout-button.graphql";
import colors from "../../colors";
import styled from "@emotion/styled";
import { useMutation } from "@apollo/client/react";
import { notify } from "../../utils/notify";
import { useHandleError } from "../../utils/error-handler";
import { useApolloClient } from "@apollo/client/react/compiled";
import type { CSSProperties } from "react";

const LogoutButton = (props: { children: React.ReactNode, style?: CSSProperties}) => {
  const { user, logout } = useAuth();
  const client = useApolloClient();
  const handleError = useHandleError();

  const handleLogout = () => {
    if (user) {
      logoutMutation()
      client.clearStore().then(() => {
        logout();
      })
    }
  }

  const [logoutMutation] = useMutation(LOGOUT, {
    onCompleted(){
      notify("🫶 smell ya' later")
    },
    onError(error) {
      handleError({ error });
    }
  })

  return (
    <LogoutButtonContainer data-testid={"logout-link"} onClick={handleLogout} to={"/"} buttonStyle={props.style}>
      {props.children}
    </LogoutButtonContainer>
  )
}

export default LogoutButton;

const LogoutButtonContainer = styled(Link)<{buttonStyle?: CSSProperties}>(({buttonStyle}) => ({
  ...(buttonStyle ? buttonStyle : {
    textDecoration: "none",
    width: "100%",
    color: colors.leatherBlack,
    background: colors.eggShellWhite,
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
      color: colors.eggShellWhite,
      background: colors.wineRed,
    },
  })
}))
