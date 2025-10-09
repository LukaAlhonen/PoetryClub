import styled from "@emotion/styled"
import { Layout } from "../../components";
import colors from "../../colors";
import { CREATE_POEM } from "./compose-poem.graphql";
import type { CreatePoemMutation, CreatePoemMutationVariables } from "../../__generated__/types";
import { useMutation } from "@apollo/client/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner";

const ComposePoem = () => {
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [createPoemMutation, { data, loading, error }] = useMutation<CreatePoemMutation, CreatePoemMutationVariables>(CREATE_POEM)
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.createPoem.id) {
      setText("");
      setTitle("");
      navigate(`/poem/${data.createPoem.id}`)
    }
  }, [data, navigate])

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <Layout>
      <ComposePoemContainer>
        <ComposeTitle>
          <h3>Compose New Poem</h3>
        </ComposeTitle>
        <ComposeForm onSubmit={(e) => {
          e.preventDefault();
          createPoemMutation({variables: {input: {title, text}}})
        }}>
          <InputContainer>
            <h4>Title</h4>
            <FormInput value={title} onChange={(e) => {
              setTitle(e.target.value)
            }}/>
          </InputContainer>
          <FormTextArea rows={20} maxLength={2000} required={true} value={text} onChange={(e) => {
            setText(e.target.value)
          }} />
          <ComposeButton type="submit">Submit</ComposeButton>
        </ComposeForm>
      </ComposePoemContainer>
    </Layout>
  )
}

export default ComposePoem;

const ComposePoemContainer = styled.div({
  justifySelf: "center",
  display: "flex",
  flexDirection: "column",
  maxWidth: "50em",
  minWidth: "10em",
  width: "100%",
  alignItems: "stretch",
  background: colors.textEggshell,
  padding: "1em",
  borderRadius: "0.5em",
  color: colors.backgroundBlack
})

const ComposeTitle = styled.div({
  fontSize: "1.7em",
  color: colors.backgroundBlack,
  alignSelf: "center",
  marginBottom: "2em"
})

const ComposeForm = styled.form({
  display: "flex",
  flexDirection: "column",
})

const FormInput = styled.input({
  display: "flex",
  maxWidth: "20em",
  border: `0.15em solid ${colors.backgroundBlack}`,
  background: colors.textEggshell,
  margin: "0.5em",
  padding: "0.3em",
  boxSizing: "border-box",
  fontSize: "1.1em",
  borderRadius: "0.5em",
  "&:focus": {
    outline: "none",
    border: `0.15em solid ${colors.wineRed}`
  },
  "&:hover": {
    border: `0.15em solid ${colors.wineRed}`,
  }
})

const FormTextArea = styled.textarea({
  resize: "none",
  border: `0.15em solid ${colors.backgroundBlack}`,
  background: colors.textEggshell,
  margin: "0.5em",
  padding: "0.3em",
  boxSizing: "border-box",
  fontSize: "1.1em",
  borderRadius: "0.5em",
  "&:focus": {
    outline: "none",
    border: `0.15em solid ${colors.wineRed}`
  },
  "&:hover": {
    border: `0.15em solid ${colors.wineRed}`,
  }
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

const ComposeButton = styled.button({
  display: "flex",
  justifyContent: "center",
  alignSelf: "center",
  textDecoration: "none",
  background: colors.backgroundBlack,
  color: colors.textEggshell,
  border: "none",
  boxSizing: "border-box",
  margin: "0.5em",
  padding: "0.75em",
  maxWidth: "20em",
  minWidth: "15em",
  borderRadius: "0.5em",
  fontSize: "1.1em",
  "&:hover": {
    background: colors.wineRed,
    cursor: "pointer"
  }
})
