import styled from "@emotion/styled";
import { useFragment, type FragmentType } from "../__generated__";
import { POEM_DETAIL_FRAGMENT } from "../fragments/poem-detail.fragment";

interface PoemDetailProps {
  // the optional null is mainly to silence the lsp, QueryResult in the parent
  // component should already make sure that no null or undefined data is passed to this component
  poem?: FragmentType<typeof POEM_DETAIL_FRAGMENT> | null;
}

const PoemDetail = (props: PoemDetailProps) => {
  const poem = useFragment(POEM_DETAIL_FRAGMENT, props.poem);

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
      <HeaderContainer>
        <h1>{poem?.title ?? "loading..."}</h1>
      </HeaderContainer>
      <div>
        <p>By: {poem.author.username ?? "loading..."}</p>
        <p>Published: {poem?.datePublished ?? "loading..."}</p>
        <p>{poem?.text ?? "loading..."}</p>
      </div>
    </PoemDetailContainer>
  );
};

const PoemDetailContainer = styled.div({
  display: "flex",
  flexDirection: "column",
});

const HeaderContainer = styled.div({
  color: "white",
});

export default PoemDetail;
