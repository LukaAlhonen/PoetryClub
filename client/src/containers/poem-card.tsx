import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import colors from "../colors";
import { useFragment, type FragmentType } from "../__generated__";
import { POEM_CARD_FRAGMENT } from "../fragments/poem-card.fragment";
import { dateFormatter } from "../utils/formatters";

import CommentsIcon from "../assets/icons/comment.svg?react";
import LikesIcons from "../assets/icons/heart2.svg?react";
import ViewsIcon from "../assets/icons/eye.svg?react";
import ArrowIcon from "../assets/icons/arrow-right.svg?react";

interface PoemCardProps {
  poem?: FragmentType<typeof POEM_CARD_FRAGMENT>;
}

const PoemCard = (props: PoemCardProps) => {
  const poem = useFragment(POEM_CARD_FRAGMENT, props.poem);
  const date = poem?.datePublished
    ? dateFormatter(poem.datePublished)
    : "loading...";

  return (
    <PoemContainer>
      <PoemHeader>
        <PoemTitle to={poem ? `/poem/${poem?.id}` : "#"}>
          <h3>{poem?.title ?? "loading..."}</h3>
        </PoemTitle>
        <PoemSubHeader>
          <ProfilePictureContainer></ProfilePictureContainer>
          <UsernameContainer to="/">
            {poem?.author?.username ?? "loading..."}
          </UsernameContainer>
          <h5>{date}</h5>
        </PoemSubHeader>
      </PoemHeader>
      <TextContainer>
        {poem?.text ?? "loading..."}
        <PoemLink to={poem ? `/poem/${poem?.id}` : "#"}>
          Show full poem <Arrow />
        </PoemLink>
      </TextContainer>
      <PoemFooter>
        <TagsContainer>
          <h5>#tag|#tag|#tag</h5>
        </TagsContainer>
        <StatsContainer>
          <CommentsButton />
          1
          <LikesButton />
          1
          <ViewsButton />1
        </StatsContainer>
      </PoemFooter>
    </PoemContainer>
  );
};

export default PoemCard;

const PoemContainer = styled.div({
  minWidth: "20em",
  maxWidth: "30em",
  width: "100%",
  justifySelf: "center",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  maxHeight: "20em",
  minHeight: "8.5em",
  height: "20em",
  boxSizing: "border-box",
  wordWrap: "break-word",
  overflowWrap: "break-word",
  background: colors.secondary,
  color: colors.primary,
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

const PoemTitle = styled(Link)({
  textDecoration: "none",
  color: colors.secondary,
  // position: "relative",
  // "&::after": {
  //   content: '""',
  //   position: "absolute",
  //   bottom: "-2em",
  //   left: "0",
  //   width: "100%",
  //   borderBottom: "2px solid white",
  //   transition: "width 0.4s ease",
  // },
  // "&:hover::after": {
  //   width: "100%",
  // },
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

const TextContainer = styled.div({
  position: "relative",
  height: "20em",
  overflow: "hidden",
  padding: "0.4em 0.4em 0 0.4em",

  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "5em",
    background: `linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.9) 90%
    )`,
    pointerEvents: "none",
  },
});

const PoemLink = styled(Link)({
  position: "absolute",
  bottom: "0.4em",
  left: "50%",
  transform: "translateX(-50%)",
  textAlign: "center",
  zIndex: 2,
  // textShadow: "0 1px 2px black",
  fontWeight: "bold",
  cursor: "pointer",

  transition: "transform 0.2s ease-out, color 0.15s ease",
  "&:hover": {
    transform: "translateX(-50%) translateY(-3px)",
    color: "red",
  },

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
  textDecoration: "none",
  color: "blue",
});

const PoemFooter = styled.div({
  padding: "0.6em",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
  borderTop: `2px solid ${colors.background2}`,
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

// Icons

const svgButtonStyles = {
  width: "1em",
  margin: "0 0.5em 0 0.5em",
  height: "1em",
};

const CommentsButton = styled(CommentsIcon)({
  ...svgButtonStyles,
  "& path": {
    fill: "black",
    transition: "fill 0.15s ease",
  },
  "&:hover path": {
    fill: "red",
  },
});

const LikesButton = styled(LikesIcons)({
  ...svgButtonStyles,
  "& path": {
    fill: "black",
    transition: "fill 0.15s ease",
  },
  "&:hover path": {
    fill: "red",
  },
});

const ViewsButton = styled(ViewsIcon)({
  ...svgButtonStyles,
});

const Arrow = styled(ArrowIcon)({
  width: "1em",
  height: "1em",
  fill: "currentcolor",
});
