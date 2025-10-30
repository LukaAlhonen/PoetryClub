import styled from "@emotion/styled";
import colors from "../../colors";
import PoemCard from "../PoemCard/poem-card";
import type { PoemCardFragmentFragment } from "../../__generated__/graphql";

interface PoemGridProps {
  // poems?: GetPoemsQuery["poems"] | GetAuthorQuery["authorByUsername"]["poems"];
  isLoading?: boolean;
  poems?: ({ __typename?: "Poem", id: string } & { ' $fragmentRefs'?: { "PoemCardFragmentFragment": PoemCardFragmentFragment } | undefined } | undefined | null)[];
  pageSize?: number | null;
}

const PoemGrid = (props: PoemGridProps) => {
  return (
    <PoemsContainer>
      {/*{props.poems?.edges?.map((edge) => {
        const isLiked = !!(edge?.node?.likes?.edges?.[0]?.node?.author?.id === userId);
        const likeId = edge?.node?.likes?.edges?.[0]?.node && edge.node.likes.edges[0].node.id;
        return (
          edge?.node ? (<PoemCard key={edge.node.id} poem={edge.node} likeId={likeId} isLiked={isLiked} />) : null
        )
      })}*/}
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
  background: colors.backgroundBlack,
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
