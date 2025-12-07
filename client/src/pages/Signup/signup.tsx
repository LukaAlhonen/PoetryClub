import { useMutation } from "@apollo/client/react";
import { Layout } from "../../components"
import type { SignupMutation, SignupMutationVariables } from "../../__generated__/graphql";
import { SIGNUP } from "./signup.graphql";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import colors from "../../colors";
import FullSizeSpinner from "../../components/full-size-spinner";
import { useHandleError } from "../../utils/error-handler";
import { notifyError, notifySuccess } from "../../utils/notify";

const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verifyPassword, setVerifyPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isFilled, setIsFilled] = useState(username.trim() !== "" && password.trim() !== "" && verifyPassword.trim() !== "" && email.trim() !== "");
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

  useEffect(() => {
    setIsFilled(username.trim() !== "" && password.trim() !== "" && verifyPassword.trim() !== "" && email.trim() !== "")
  }, [username, password, verifyPassword, email])

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
      setUsername("");
      setPassword("");
      setVerifyPassword("")
      setEmail("");
    } else {
      notifyError("passwords do not match")
    }
  }

  return (
    <Layout>
      <SignupContainer>
        <SignupInner>
        <SignupTitle>
          <h3>Signup</h3>
        </SignupTitle>
        <SignupForm onSubmit={(e) => {
          e.preventDefault();
          handleSubmit({username, password, email, verifyPassword})
        }}>
          <InputContainer>
            <h4>Username</h4>
            <SignupInput required={true} value={username} onChange={(e) => {
              setUsername(e.target.value)
            }}/>
          </InputContainer>
          <InputContainer>
            <h4>Email</h4>
            <SignupInput required={true} type="email" value={email} onChange={(e) => {
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
            <SignupButton disabled={!isFilled} isFilled={isFilled} type="submit">Signup</SignupButton>
          </InputContainer>
        </SignupForm>
        </SignupInner>
      </SignupContainer>
    </Layout>
  )
}

export default Signup;

const SignupContainer = styled.div({
  width: "100%",
  maxWidth: "100%",
  flexShrink: 1,
  minWidth: 0,
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
})

const SignupInner = styled.div({
  display: "flex",
  flexDirection: "column",
  background: colors.bg2,
  padding: "1em 5em 1em 5em",
  borderRadius: "0.5em",
  border: `0.10rem solid ${colors.darkGray}`,
  boxSizing: "border-box",
  alignItems: "center",
  maxWidth: "30em",
  justifySelf: "center",
  alignSelf: "center",
  minWidth: 0,
  width: "min(30rem, 100%)",
  marginRight: "1rem",
  color: colors.eggShellWhite,
  "@media (max-width: 769px)": {
    padding: "1em"
  }
})

const SignupTitle = styled.div({
  fontSize: "1.7em",
})

const SignupForm = styled.form({
  display: "flex",
  flexDirection: "column",
  width: "100%",
})

const InputContainer = styled.div({
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
  border: `0.10rem solid ${colors.darkGray}`,
  background: colors.test,
  color: colors.eggShellWhite,
  margin: "0.5em",
  padding: "0.3em",
  boxSizing: "border-box",
  fontSize: "1.1em",
  borderRadius: "0.3rem",
  transition: "border 0.1s ease-in-out",
  "&:focus": {
    outline: "none",
    border: `0.10rem solid ${colors.wineRed}`
  },
  "&:hover": {
    border: `0.10rem solid ${colors.wineRed}`,
  }
})

const SignupButton = styled.button<{isFilled?: boolean}>(({isFilled}) => ({
  display: "flex",
  justifyContent: "center",
  textDecoration: "none",
  background: isFilled ? colors.wineRed : colors.bg3,
  color: colors.eggShellWhite,
  border: `0.10rem solid ${colors.darkGray}`,
  boxSizing: "border-box",
  margin: "0.5em",
  padding: "0.75em",
  borderRadius: "0.3rem",
  transition: "background 0.1s ease-in-out",
  fontWeight: "bold",
  "&:hover": {
    cursor: isFilled ? "pointer" : "default",
  }
}))
