import styled from "@emotion/styled"
import { Layout } from "../../components";
import colors from "../../colors";
import { CREATE_POEM } from "./compose-poem.graphql";
import type { CreatePoemMutation, CreatePoemMutationVariables } from "../../__generated__/types";
import { useMutation } from "@apollo/client/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET_POEMS } from "../Poems/poems.graphql";
import FullSizeSpinner from "../../components/full-size-spinner";

const ComposePoem = () => {
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [createPoemMutation, { data, loading, error }] = useMutation<CreatePoemMutation, CreatePoemMutationVariables>(CREATE_POEM, {
    update(cache, { data }) {
      const cachedPoems = cache.readQuery({ query: GET_POEMS });
      if (cachedPoems && data) {
        const newNode = { node: data.createPoem, cursor: data.createPoem.id }
        cache.writeQuery({
          query: GET_POEMS,
          data: {
            poems: {
              edges: [newNode, ...cachedPoems.poems.edges],
              pageInfo: cachedPoems.poems.pageInfo
            }
          }
        })
      }
    }
  })
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.createPoem.id) {
      setText("");
      setTitle("");
      navigate(`/poem/${data.createPoem.id}`)
    }
  }, [data, navigate])

  if (loading) {
    return (
      <Layout>
        <FullSizeSpinner/>
      </Layout>
    )
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
          <FormTextArea placeholder={"write your poem here"} rows={20} maxLength={2000} required={true} value={text} onChange={(e) => {
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
  alignSelf: "center",
  display: "flex",
  flexDirection: "column",
  maxWidth: "50em",
  minWidth: "10em",
  width: "100%",
  alignItems: "stretch",
  background: colors.textEggshell,
  padding: "1em",
  borderRadius: "0.5em",
  border: "0.15rem solid gray",
  boxSizing: "border-box",
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

const FormTextArea = styled.textarea({
  resize: "none",
  border: `0.15rem solid gray`,
  background: colors.textEggshell,
  margin: "0.5em",
  padding: "0.5em",
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
  border: "0.15rem solid gray",
  color: colors.textEggshell,
  boxSizing: "border-box",
  margin: "0.5em",
  padding: "0.75em",
  maxWidth: "20em",
  minWidth: "15em",
  borderRadius: "0.5em",
  fontSize: "1.1em",
  transition: "background 0.1s ease-in-out",
  "&:hover": {
    background: colors.wineRed,
    cursor: "pointer"
  }
})
