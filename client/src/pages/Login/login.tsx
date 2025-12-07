import colors from "../../colors";
import styled from "@emotion/styled";
import { Layout } from "../../components";
import { useEffect, useState } from "react";
import { useApolloClient, useMutation } from "@apollo/client/react";
import { LOGIN } from "./login.graphql";
import type {
  LoginMutation,
  LoginMutationVariables,
} from "../../__generated__/types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/use-auth";
import FullSizeSpinner from "../../components/full-size-spinner";
import { notify } from "../../utils/notify";
import { useHandleError } from "../../utils/error-handler";

const Login = () => {
  const client = useApolloClient();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFilled, setIsFilled] = useState(
    username.trim() !== "" && password.trim() !== "",
  );
  const handleError = useHandleError();
  const [loginMutation, { loading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN, {
    fetchPolicy: "no-cache",
    onCompleted(data) {
      login(data.login.token, data.login.author.username, data.login.author.id);
      client.clearStore().then(() => {
        navigate("/");
        notify(`👋 Welcome ${data.login.author.username}!`);
      });
    },
    onError(error) {
      handleError({ error });
    },
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    setIsFilled(username.trim() !== "" && password.trim() !== "");
  }, [username, password]);

  if (loading) {
    return (
      <Layout>
        <FullSizeSpinner />
      </Layout>
    );
  }

  return (
    <Layout>
      <LoginContainer>
        <LoginInner>
        <LoginTitle>
          <h3>Login</h3>
        </LoginTitle>
        <LoginForm
          onSubmit={(e) => {
            e.preventDefault();
            loginMutation({ variables: { username, password } });
            setUsername("");
            setPassword("");
          }}
        >
          <InputContainer>
            <h4>Username</h4>
            <LoginInput
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </InputContainer>
          <InputContainer>
            <h4>Password</h4>
            <LoginInput
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </InputContainer>
          <InputContainer>
            <LoginButton disabled={!isFilled} isFilled={isFilled} type="submit">
              Login
            </LoginButton>
          </InputContainer>
        </LoginForm>
        </LoginInner>
      </LoginContainer>
    </Layout>
  );
};

export default Login;

const LoginContainer = styled.div({
  width: "100%",
  maxWidth: "100%",
  flexShrink: 1,
  minWidth: 0,
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
})

const LoginInner = styled.div({
  display: "flex",
  flexDirection: "column",
  background: colors.bg2,
  padding: "1em 5em 1em 5em",
  borderRadius: "0.5em",
  border: `0.10rem solid ${colors.darkGray}`,
  boxSizing: "border-box",
  alignItems: "center",
  justifySelf: "center",
  alignSelf: "center",
  width: "min(30rem, 100%)",
  minWidth: 0,
  marginRight: "1rem",
  "@media (max-width: 769px)": {
    padding: "1em",
  },
});

const LoginTitle = styled.div({
  fontSize: "1.7em",
  color: colors.eggShellWhite,
});

const LoginForm = styled.form({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const InputContainer = styled.div({
  color: colors.eggShellWhite,
  display: "flex",
  flexDirection: "column",
  "& h4": {
    textDecoration: "bold",
    margin: "0 0 0 0.7em",
  },
  marginBottom: "1em",
  alignItems: "stretch",
});

const LoginInput = styled.input({
  display: "flex",
  border: `0.10rem solid ${colors.darkGray}`,
  background: colors.test,
  margin: "0.5em",
  padding: "0.3em",
  boxSizing: "border-box",
  fontSize: "1.1em",
  borderRadius: "0.3em",
  transition: "border 0.1s ease-in-out",
  color: colors.eggShellWhite,
  "&:focus": {
    outline: "none",
    border: `0.10rem solid ${colors.wineRed}`,
  },
  "&:hover": {
    border: `0.10rem solid ${colors.wineRed}`,
  },
});

const LoginButton = styled.button<{ isFilled?: boolean }>(({ isFilled }) => ({
  display: "flex",
  justifyContent: "center",
  textDecoration: "none",
  background: isFilled ? colors.wineRed : colors.bg3,
  color: colors.eggShellWhite,
  border: `0.10rem solid ${colors.darkGray}`,
  boxSizing: "border-box",
  margin: "0.5em",
  padding: "0.75em",
  borderRadius: "0.3em",
  transition: "background 0.1s ease-in-out",
  fontWeight: "bold",
  "&:hover": {
    cursor: isFilled ? "pointer" : "default",
  },
}));
