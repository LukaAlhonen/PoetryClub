import styled from "@emotion/styled";
import colors from "../../colors";
import PoemCard from "../PoemCard/poem-card";
import type { PoemCardFragmentFragment } from "../../__generated__/graphql";

interface PoemGridProps {
  isLoading?: boolean;
  poems?: ({ __typename?: "Poem", id: string } & { ' $fragmentRefs'?: { "PoemCardFragmentFragment": PoemCardFragmentFragment } | undefined } | undefined | null)[];
  pageSize?: number | null;
}

const PoemGrid = (props: PoemGridProps) => {
  return (
    <PoemsContainer>
      { props.poems?.map((poem) => (
        poem?.id && <PoemCard key={poem.id} poem={poem} />
      ))}
      { props.isLoading && props.pageSize ?
        Array.from({ length: props.pageSize }).map((_, i) => (
          <PoemCard key={`skeleton_${i}`} />
        ))
       : null}
    </PoemsContainer>
  )
}

const PoemsContainer = styled.div({
  background: colors.leatherBlack,
  overflowX: "hidden",
  display: "grid",
  gap: "1em",
  width: "100%",
  minHeight: "100vh",
  gridTemplateColumns: "repeat(auto-fit, minmax(20em, 1fr))",
  justifyContent: "center",
  paddingTop: "1rem",
  paddingBottom: "2rem",
  boxSizing: "border-box",
});

export default PoemGrid;
