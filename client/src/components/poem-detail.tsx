import styled from "@emotion/styled";
import { useFragment, type FragmentType } from "../__generated__";
import { POEM_DETAIL_FRAGMENT } from "../fragments/poem-detail.fragment";
import { dateFormatter } from "../utils/formatters";
import colors from "../colors";

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

  if (!poem) {
    return (
      <PoemDetailContainer>
        <HeaderContainer>
          <h1>Poem not found</h1>
        </HeaderContainer>
      </PoemDetailContainer>
    );
  }

  return (
    <PoemDetailContainer>
      <CoverImageContainer>
        <img src="src/assets/3KopAOI.jpg"></img>
      </CoverImageContainer>
      <PoemContentContainer>
        <HeaderContainer>
          <h1>{poem?.title ?? "loading..."}</h1>
        </HeaderContainer>
        <div>
          <p>By: {poem.author.username ?? "loading..."}</p>
          <p>Published: {date}</p>
          <p>{poem?.text ?? "loading..."}</p>
        </div>
      </PoemContentContainer>
    </PoemDetailContainer>
  );
};

const PoemDetailContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "60%",
  height: "100vh",
});

const CoverImageContainer = styled.div({
  margin: "0",
  padding: "0",
  background: "white",
  height: "40%",
  minHeight: "150px",
  width: "100%",
  border: `2px solid ${colors.accent}`,
  overflow: "hidden",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "grayscale(100%)",
  },
});

const PoemContentContainer = styled.div({
  maxWidth: "60%",
});

const HeaderContainer = styled.div({
  color: "black",
});

export default PoemDetail;
