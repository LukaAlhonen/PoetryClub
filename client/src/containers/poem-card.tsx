import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import colors from "../colors";
import { useFragment, type FragmentType } from "../__generated__";
import { POEM_CARD_FRAGMENT } from "../fragments/poem-card.fragment";

interface PoemCardProps {
  poem?: FragmentType<typeof POEM_CARD_FRAGMENT>;
}

const PoemCard = (props: PoemCardProps) => {
  const poem = useFragment(POEM_CARD_FRAGMENT, props.poem);

  return (
    <PoemContainer to={poem ? `/poem/${poem?.id}` : "#"}>
      <PoemHeader>
        <h3>{poem?.title ?? "loading..."}</h3>
        <h5>by {poem?.author?.username ?? "loading..."}</h5>
      </PoemHeader>
      <PoemFooter>
        <h5>{poem?.datePublished ?? "loading..."}</h5>
      </PoemFooter>
    </PoemContainer>
  );
};

export default PoemCard;

const PoemContainer = styled(Link)({
  margin: "5px",
  borderRadius: "5px",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  alignItems: "flex-start",
  maxWidth: "400px",
  minWidth: "300px",
  boxSizing: "border-box",
  wordWrap: "break-word",
  overflowWrap: "break-word",
  boxShadow: "2px 2px 2px 2px #262626",
  background: colors.secondary,
  color: colors.primary,
});

const PoemHeader = styled.div({
  "& h3": {
    margin: "0 0 5px 0",
    fontSize: "25px",
  },
  "& h5": {
    margin: "0 0 5px 0",
    fontSize: "15px",
  },
  background: colors.accent,
  padding: "5px",
  color: colors.secondary,
  width: "100%",
});

const PoemFooter = styled.div({
  padding: "5px",
  borderBottomLeftRadius: "5px",
  borderBottomRightRadius: "5px",
  "& h5": {
    margin: 0,
  },
});
