import colors from "../../colors";
import styled from "@emotion/styled";
import { Layout } from "../../components";
import { useState, useEffect } from "react";
import { useApolloClient, useMutation } from "@apollo/client/react";
import { LOGIN } from "./login.graphql";
import type { LoginMutation, LoginMutationVariables } from "../../__generated__/types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/use-auth";
import FullSizeSpinner from "../../components/full-size-spinner";
// import { GET_POEMS } from "../Poems/poems.graphql";

const Login = () => {
  const client = useApolloClient();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMutation, { data, loading, error }] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN, {
    fetchPolicy: "no-cache",
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    if (data?.login.token) {
      login(data.login.token, data.login.author.username, data.login.author.id)
      client.clearStore().then(() => {
        // client.refetchQueries({
        //   include: [GET_POEMS],
        // })
        navigate("/")
      })
    }
  }, [data, login, navigate, client])

  if (error) {
    return <div>{error.message}</div>
  }

  if (loading) {
    return (
      <Layout>
        <FullSizeSpinner />
      </Layout>
    )
  }

  return (
    <Layout>
      <LoginContainer>
        <LoginTitle>
          <h3>Login</h3>
        </LoginTitle>
        <LoginForm onSubmit={(e) => {
            e.preventDefault();
            loginMutation({ variables: { username, password } });
            setUsername("");
            setPassword("");
        }}>
          <InputContainer>
            <h4>Username</h4>
            <LoginInput value={username} onChange={(e) => {
              setUsername(e.target.value)
            }}/>
          </InputContainer>
          <InputContainer>
            <h4>Password</h4>
            <LoginInput type="password" value={password} onChange={(e) => {
              setPassword(e.target.value)
            }}/>
          </InputContainer>
          <InputContainer>
            <LoginButton type="submit">Login</LoginButton>
          </InputContainer>
        </LoginForm>
      </LoginContainer>
    </Layout>
  );
};

export default Login;

const LoginContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  background: colors.textEggshell,
  padding: "1em 5em 1em 5em",
  borderRadius: "0.5em",
  border: "0.15rem solid gray",
  boxSizing: "border-box",
  alignItems: "center",
  maxWidth: "30em",
  justifySelf: "center",
  alignSelf: "center",
  width: "100%",
})

const LoginTitle = styled.div({
  fontSize: "1.7em",
  color: colors.backgroundBlack
})

const LoginForm = styled.form({
  display: "flex",
  flexDirection: "column",
  width: "100%",
})

const InputContainer = styled.div({
  color: colors.backgroundBlack,
  display: "flex",
  flexDirection: "column",
  "& h4": {
    textDecoration: "bold",
    margin: "0 0 0 0.7em",
  },
  marginBottom: "1em",
  alignItems: "stretch",
})

const LoginInput = styled.input({
  display: "flex",
  border: `0.15rem solid gray`,
  background: colors.textEggshell,
  margin: "0.5em",
  padding: "0.3em",
  boxSizing: "border-box",
  fontSize: "1.1em",
  borderRadius: "0.5em",
  transition: "border 0.1s ease-in-out",
  "&:focus": {
    outline: "none",
    border: `0.15rem solid ${colors.wineRed}`
  },
  "&:hover": {
    border: `0.15rem solid ${colors.wineRed}`,
  }
})

const LoginButton = styled.button({
  display: "flex",
  justifyContent: "center",
  textDecoration: "none",
  background: colors.backgroundBlack,
  color: colors.textEggshell,
  border: `0.15rem solid gray`,
  boxSizing: "border-box",
  margin: "0.5em",
  padding: "0.75em",
  borderRadius: "0.5em",
  transition: "background 0.1s ease-in-out",
  fontWeight: "bold",
  "&:hover": {
    background: colors.wineRed,
    cursor: "pointer"
  }
})
