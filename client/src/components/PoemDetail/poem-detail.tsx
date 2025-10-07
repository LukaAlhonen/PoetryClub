import styled from "@emotion/styled";
import { useFragment, type FragmentType } from "../../__generated__";
import { POEM_DETAIL_FRAGMENT } from "./poem-detail.graphql";
import { dateFormatter } from "../../utils/formatters";
import { Link } from "react-router-dom";

import UserIcon from "../../assets/icons/user.svg?react";
// import colors from "../colors";

interface PoemDetailProps {
  // the optional null is mainly to silence the lsp, QueryResult in the parent
  // component should already make sure that no null or undefined data is passed to this component
  poem?: FragmentType<typeof POEM_DETAIL_FRAGMENT> | null;
}

const PoemDetail = (props: PoemDetailProps) => {
  const poem = useFragment(POEM_DETAIL_FRAGMENT, props.poem);

  const date = poem?.datePublished
    ? dateFormatter(poem.datePublished)
    : "loading...";

  // TODO: create 404 page to redirect to
  if (!poem) {
    return (
      <PoemDetailContainer>
        <h1>Poem not found</h1>
      </PoemDetailContainer>
    );
  }

  return (
    <PoemDetailContainer>
      <PoemHeader>{poem.title}</PoemHeader>
      <PoemSubHeader>
        <AuthorContainer to="/">
          <UserButton />
          {poem.author.username}
        </AuthorContainer>
        {date}
      </PoemSubHeader>
      <TextContainer>{poem.text}</TextContainer>
    </PoemDetailContainer>
  );
};

export default PoemDetail;

const PoemDetailContainer = styled.div({
  display: "flex",
  flexDirection: "column",
});

const PoemHeader = styled.div({
  display: "flex",
});

const PoemSubHeader = styled.div({
  display: "flex",
});

const AuthorContainer = styled(Link)({
  display: "flex",
  textDecoration: "none",
  color: "blue",
  transition: "color 0.15s ease",
  "&:hover": {
    color: "red",
  },
});

const TextContainer = styled.div({});

const UserButton = styled(UserIcon)({
  width: "1.5em",
  height: "1.5em",
  fill: "currentcolor",
  transition: "fill 0.15s ease",
});
