import styled from "@emotion/styled";
import colors from "../../colors";
import PoemCard from "../PoemCard/poem-card";
import type { GetAuthorQuery, GetPoemsQuery } from "../../__generated__/graphql";

interface PoemGridProps {
  poems?: GetPoemsQuery["poems"] | GetAuthorQuery["authorByUsername"]["poems"];
  isLoading?: boolean
}

const PoemGrid = (props: PoemGridProps) => {
  return (
    <PoemsContainer>
      {props.poems?.edges?.map((edge) => (
        edge?.node ? (<PoemCard key={edge.node.id} poem={edge.node} /> ) : null
      ))}
      { props.isLoading && props.poems?.pageInfo?.pageSize ?
        Array.from({ length: props.poems.pageInfo.pageSize }).map((_, i) => (
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
  padding: "1em",
  boxSizing: "border-box",
});

export default PoemGrid;
