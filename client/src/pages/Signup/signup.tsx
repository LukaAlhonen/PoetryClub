import { useMutation } from "@apollo/client/react";
import { Layout } from "../../components"
import type { SignupMutation, SignupMutationVariables } from "../../__generated__/graphql";
import { SIGNUP } from "./signup.graphql";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import colors from "../../colors";
import FullSizeSpinner from "../../components/full-size-spinner";
import { useHandleError } from "../../utils/error-handler";
import { notifySuccess } from "../../utils/notify";

const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verifyPassword, setVerifyPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const handleError = useHandleError();
  const [signupMutation, { loading }] = useMutation<SignupMutation, SignupMutationVariables>(SIGNUP, {
    onError(error) {
      handleError({ error })
    },
    onCompleted() {
      notifySuccess("account created!")
      navigate("/login")
    }
  });
  const navigate = useNavigate();

  if (loading) {
    return (
      <Layout>
        <FullSizeSpinner />
      </Layout>
    )
  }

  const handleSubmit = ({ username, email, password, verifyPassword }: { username: string; email: string; password: string; verifyPassword: string; }) => {
    if (password === verifyPassword) {
      signupMutation({ variables: { input: { username, email, password } } });
    } else {
      console.error("passwords do not match")
    }
  }

  return (
    <Layout>
      <SignupContainer>
        <SignupTitle>
          <h3>Signup</h3>
        </SignupTitle>
        <SignupForm onSubmit={(e) => {
          e.preventDefault();
          handleSubmit({username, password, email, verifyPassword})
          setUsername("");
          setPassword("");
          setVerifyPassword("")
          setEmail("");
        }}>
          <InputContainer>
            <h4>Username</h4>
            <SignupInput required={true} value={username} onChange={(e) => {
              setUsername(e.target.value)
            }}/>
          </InputContainer>
          <InputContainer>
            <h4>Email</h4>
            <SignupInput required={true} value={email} onChange={(e) => {
              setEmail(e.target.value)
            }}/>
          </InputContainer>
          <InputContainer>
            <h4>Password</h4>
            <SignupInput required={true} type="password" value={password} onChange={(e) => {
              setPassword(e.target.value)
            }}/>
          </InputContainer>
          <InputContainer>
            <h4>Verify Password</h4>
            <SignupInput required={true} type="password" value={verifyPassword} onChange={(e) => {
              setVerifyPassword(e.target.value)
            }}/>
          </InputContainer>
          <InputContainer>
            <SignupButton type="submit">Signup</SignupButton>
          </InputContainer>
        </SignupForm>
      </SignupContainer>
    </Layout>
  )
}

export default Signup;

const SignupContainer = styled.div({
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
  marginRight: "1rem",
  "@media (max-width: 769px)": {
    padding: "1em"
  }
})

const SignupTitle = styled.div({
  fontSize: "1.7em",
  color: colors.backgroundBlack
})

const SignupForm = styled.form({
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

const SignupInput = styled.input({
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

const SignupButton = styled.button({
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
