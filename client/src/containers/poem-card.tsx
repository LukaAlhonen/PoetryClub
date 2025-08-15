import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import colors from "../colors";
import { useFragment, type FragmentType } from "../__generated__";
import { POEM_CARD_FRAGMENT } from "../fragments/poem-card.fragment";
import { dateFormatter } from "../utils/formatters";

interface PoemCardProps {
  poem?: FragmentType<typeof POEM_CARD_FRAGMENT>;
}

const PoemCard = (props: PoemCardProps) => {
  const poem = useFragment(POEM_CARD_FRAGMENT, props.poem);
  const date = poem?.datePublished
    ? dateFormatter(poem.datePublished)
    : "loading...";

  return (
    <PoemContainer to={poem ? `/poem/${poem?.id}` : "#"}>
      <CoverImage>
        <img src="src/assets/3KopAOI.jpg"></img>
      </CoverImage>
      <PoemHeader>
        <h3>{poem?.title ?? "loading..."}</h3>
        <PoemSubHeader>
          <ProfilePictureContainer></ProfilePictureContainer>
          <UsernameContainer to="/">
            {poem?.author?.username ?? "loading..."}
          </UsernameContainer>
          <h5>{date}</h5>
        </PoemSubHeader>
      </PoemHeader>
      <PoemFooter>
        <TagsContainer>
          <h5>#tag|#tag|#tag</h5>
        </TagsContainer>
        <StatsContainer>
          <h5>comments</h5>
          <h5>likes</h5>
          <h5>views</h5>
        </StatsContainer>
      </PoemFooter>
    </PoemContainer>
  );
};

export default PoemCard;

const PoemContainer = styled(Link)({
  textDecoration: "none",
  margin: "20px",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  alignItems: "flex-start",
  maxWidth: "400px",
  minWidth: "400px",
  maxHeight: "600px",
  boxSizing: "border-box",
  wordWrap: "break-word",
  overflowWrap: "break-word",
  background: colors.secondary,
  color: colors.primary,
});

const CoverImage = styled.div({
  margin: "0",
  padding: "0",
  background: "white",
  height: "50%",
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

const PoemHeader = styled.div({
  "& h3": {
    margin: "0 0 5px 0px",
    fontSize: "25px",
  },
  background: colors.accent,
  padding: "5px 10px 5px 10px",
  color: colors.secondary,
  width: "100%",
});

const PoemSubHeader = styled.div({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

const ProfilePictureContainer = styled.div({
  borderRadius: "50%",
  background: "white",
  width: "40px",
  height: "40px",
  marginRight: "10px",
});

const UsernameContainer = styled(Link)({
  "& h5": {
    margin: "0",
    fontSize: "15px",
  },
  textDecoration: "none",
  color: colors.secondary,
  marginRight: "auto",
});

const PoemFooter = styled.div({
  padding: "5px",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  borderBottomLeftRadius: "5px",
  borderBottomRightRadius: "5px",
  border: `2px solid ${colors.accent}`,
  borderTop: "0",
  "& h5": {
    margin: 0,
  },
});

const TagsContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "left",
  marginRight: "auto",
});

const StatsContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "right",
  alignContent: "space-evenly",
});
