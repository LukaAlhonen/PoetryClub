import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import colors from "../../colors";
import { useFragment, type FragmentType } from "../../__generated__";
import { POEM_CARD_FRAGMENT } from "./poem-card.graphql";
import { dateFormatter } from "../../utils/formatters";
import Spinner from "../spinner";
import LikeButton from "../../containers/LikeButton/like-button";
import { keyframes } from "@emotion/react";

import CommentSVG from "../../assets/icons/comment.svg?react";
import ThumbSVG from "../../assets/icons/thumbs-up.svg?react";
import ViewsIcon from "../../assets/icons/eye3.svg?react";
import ArrowIcon from "../../assets/icons/arrow-right.svg?react";
import UserIcon from "../../assets/icons/user.svg?react";
import SavedSVG from "../../assets/icons/bookmark.svg?react";
import SaveButton from "../../containers/SaveButton/save-button";

interface PoemCardProps {
  poem?: FragmentType<typeof POEM_CARD_FRAGMENT>;
}

const PoemCard = (props: PoemCardProps) => {
  const poem = useFragment(POEM_CARD_FRAGMENT, props.poem);
  const date = poem?.datePublished
    ? dateFormatter(poem.datePublished)
    : "";

  return (
    <PoemContainer>
      <PoemHeader>
        <PoemTitle data-testid={`poem-title-link-${poem?.id}`} to={poem ? `/poem/${poem?.id}` : "#"}>
          {poem?.title ? <h3>{poem.title}</h3> : <LoadingText><h3>loading</h3></LoadingText>}
        </PoemTitle>
        <PoemSubHeader>
          <UsernameContainer data-testid={`poem-author-link-${poem?.author?.id}`} to={poem?.author?.username ? `/author/${poem.author.username}` : "#"}>
            <UserButton></UserButton>
            {poem?.author?.username ?? null}
          </UsernameContainer>
          <h5>{date}</h5>
        </PoemSubHeader>
      </PoemHeader>
      <TextContainer>
        {poem ?
          <>
            {poem.text}
            <PoemLink data-testid={`poem-link-${poem?.id}`} to={poem ? `/poem/${poem?.id}` : "#"}>
              Show full poem <Arrow />
            </PoemLink>
          </>
          : <SpinnerContainer><Spinner data-testid={"poem-spinner"} /></SpinnerContainer>
        }
      </TextContainer>
      <PoemFooter>
        <StatsContainer>
          <LikeButton data-testid={`like-button-${poem?.id}`} poemId={poem?.id} likedByCurrentUser={poem?.likedByCurrentUser}>
            <LikeIcon />
            <span data-testid="likesCount">
              {poem?.likesCount}
            </span>
          </LikeButton>
          <CommentsButton data-testid={`comments-button-${poem?.id}`} to={poem ? `/poem/${poem?.id}#composeComment` : "#"}>
            <CommentIcon />
            <span data-testid="commentsCount">
              {poem?.commentsCount}
            </span>
          </CommentsButton>
          <SaveButton data-testid={`save-button-${poem?.id}`} poemId={poem?.id} savedByCurrentUser={poem?.savedByCurrentUser}>
            <SavedIcon />
            <span data-testid="savedByCount">
              {poem?.savedByCount}
            </span>
          </SaveButton>
        </StatsContainer>
        <TagsContainer>
          <ViewsButton />
          <span data-testid="views">
            {poem?.views}
          </span>
        </TagsContainer>
      </PoemFooter>
    </PoemContainer>
  );
};

export default PoemCard;

const PoemContainer = styled.div({
  minWidth: "10em",
  maxWidth: "30em",
  width: "100%",
  justifySelf: "center",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  maxHeight: "30em",
  height: "30em",
  boxSizing: "border-box",
  border: "0.15em solid gray",
  wordWrap: "break-word",
  overflowWrap: "break-word",
  background: colors.textEggshell,
  color: colors.backgroundBlack,
  borderRadius: "0.6em"
});

const PoemHeader = styled.div({
  "& h3": {
    margin: "0 0 5px 0px",
    fontSize: "25px",
  },
  background: colors.textEggshell,
  padding: "1em 1em 0 1em",
  color: colors.backgroundBlack,
  // width: "100%",
  boxSizing: "border-box",
  borderBottom: "0.15em solid gray"
});

const PoemTitle = styled(Link)({
  textDecoration: "none",
  color: colors.backgroundBlack,
  position: "relative",
  backgroundImage: `linear-gradient(${colors.wineRed}, ${colors.wineRed})`,
  backgroundPosition: "0 100%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "0% 0.2em",
  transition: "none",

  "&:hover": {
    transition: "color 0.1s ease, background-size 0.1s ease",
    backgroundSize: "100% 0.2em",
    color: colors.wineRed,
  },
  "& h3": {
    display: "inline",
    margin: "0",
  }
});

const PoemSubHeader = styled.div({
  // width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

const UsernameContainer = styled(Link)({
  "& h5": {
    margin: "0",
    fontSize: "15px",
  },
  textDecoration: "none",
  boxSizing: "border-box",
  padding: "0.3em",
  borderRadius: "0.5em",
  color: colors.backgroundBlack,
  background: colors.textEggshell,
  transition: "color 0.1s ease-in-out, background 0.1s ease-in-out",
  marginRight: "auto",
  fontWeight: "bold",
  alignItems: "center",
  display: "flex",
  border: `0.15em solid gray`,
  "&:hover": {
    color: colors.textEggshell,
    background: colors.wineRed,
    // border: `0.15em solid ${colors.wineRed}`
  },
  "&:hover path": {
    fill: colors.textEggshell
  },
});

const TextContainer = styled.div({
  flexGrow: 1,
  minHeight: 0,
  overflow: "hidden",
  display: "flex",
  alignSelf: "center",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  position: "relative",
  padding: "0.4em 0.4em 2em 0.4em",
  justifyContent: "flex-start",
  width: "100%",

  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "10em",
    background: `linear-gradient(
      to bottom,
      rgba(220, 226, 220, 0) 0%,
      rgba(220, 226, 220, 1.0) 100%
    )`,
    pointerEvents: "none",
  },
});

const PoemLink = styled(Link)({
  position: "absolute",
  bottom: "0.7em",
  left: "50%",
  transform: "translateX(-50%)",
  textWrap: "nowrap",
  fontSize: "1.2em",
  zIndex: 2,
  fontWeight: "bold",
  cursor: "pointer",

  transition: "transform 0.1s ease-out, color 0.15s ease",
  "&:hover": {
    transform: "translateX(-50%) translateY(-3px)",
    color: colors.wineRed,
  },
  "&:hover svg": {
    transform: "scaleX(1)",
    opacity: 1,
  },

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
  textDecoration: "none",
  color: colors.foregroundBlack,
});

const PoemFooter = styled.div({
  padding: "0.6em",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
  borderTop: `0.15em solid gray`,
  "& h5": {
    margin: 0,
  },
  background: colors.textEggshell,
  color: colors.backgroundBlack
});

const TagsContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "left",
  marginLeft: "auto",
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

const CommentsButton = styled(Link)({
  textDecoration: "none",
  display: "flex",
  height: "2.1rem",
  minWidth: "3.2rem",
  color: colors.backgroundBlack,
  background: colors.textEggshell,
  border: "0.15rem solid gray",
  borderRadius: "0.5rem",
  padding: "0.2rem 0.3rem 0.2rem 0.3rem",
  alignItems: "center",
  marginLeft: "0.5rem",
  marginRight: "0.5rem",
  font: "inherit",
  fontFamily: "inherit",
  fontSize: "inherit",
  fontWeight: "inherit",
  "&:hover": {
    background: colors.wineRed,
    color: colors.textEggshell,
    cursor: "pointer"
  }
})

const CommentIcon = styled(CommentSVG)({
  width: "1.5rem",
  height: "1.5rem",
  marginRight: "0.3rem",
  "& path": {
    fill: "currentcolor"
  }
})

const LikeIcon = styled(ThumbSVG)({
  width: "1.5em",
  height: "1.5em",
  marginRight: "0.3em",
  "& path": {
    fill: "currentColor"
  }
})

const SavedIcon = styled(SavedSVG)({
  width: "1.5rem",
  height: "1.5rem",
  marginRight: "0.3rem",
  "& path": {
    fill: "currentcolor"
  }
})

const ViewsButton = styled(ViewsIcon)({
  ...svgButtonStyles,
  "& path": {
    fill: colors.backgroundBlack
  }
});

const UserButton = styled(UserIcon)({
  height: "1.5em",
  width: "1.5em",
  transition: "fill 0.1s ease",
  margin: "0 0.2em 0 0",
  "& path": {
    fill: colors.backgroundBlack,
    transition: "fill 0.1s ease"
  }
})

const Arrow = styled(ArrowIcon)({
  width: "1em",
  opacity: 0,
  transform: "scaleX(0)",
  height: "1em",
  fill: "currentcolor",
  transition: "transform 0.15s ease"
});

const SpinnerContainer = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
});

const dots = keyframes`
  0%   { content: ''; }
  25%  { content: '.'; }
  50%  { content: '..'; }
  75%  { content: '...'; }
  100% { content: ''; }
`;

const LoadingText = styled.span({
  position: "relative",
  color: colors.backgroundBlack,
  fontSize: "1.2em",
  fontWeight: 500,

  "&::after": {
    content: "''",
    animation: `${dots} 1.5s steps(4, end) infinite`,
  },
});
