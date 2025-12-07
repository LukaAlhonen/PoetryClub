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
            <UsernameTextContainer>{poem?.author?.username ?? null}</UsernameTextContainer>
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
  // border: "0.15em solid gray",
  border: `0.10em solid ${colors.darkGray}`,
  wordWrap: "break-word",
  overflowWrap: "break-word",
  background: colors.bg2,
  color: colors.leatherBlack,
  borderRadius: "0.6em"
});

const PoemHeader = styled.div({
  "& h3": {
    margin: "0 0 5px 0px",
    fontSize: "25px",
  },
  background: colors.bg2,
  padding: "1em 1em 0 1em",
  color: colors.eggShellWhite,
  boxSizing: "border-box",
  borderBottom: `0.15em solid ${colors.darkGray}`
});

const PoemTitle = styled(Link)({
  textDecoration: "none",
  color: colors.eggShellWhite,
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
  padding: "0.3em 0.5rem 0.3rem 0.3rem",
  borderRadius: "0.3em",
  color: colors.eggShellWhite,
  background: colors.test,
  transition: "color 0.1s ease-in-out, background 0.1s ease-in-out",
  marginRight: "auto",
  fontWeight: "bold",
  alignItems: "center",
  display: "flex",
  border: `0.10em solid ${colors.darkGray}`,
  "&:hover": {
    color: colors.eggShellWhite,
    background: colors.wineRed,
  },
  "&:hover path": {
    fill: colors.eggShellWhite
  },
  maxWidth: "12rem"
});

const UsernameTextContainer = styled.div({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
})

const TextContainer = styled.div({
  flexGrow: 1,
  minHeight: 0,
  overflow: "hidden",
  color: colors.eggShellWhite,
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
      rgba(21, 26, 28, 0) 0%,
      rgba(21, 26, 28, 1.0) 100%
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
  color: colors.eggShellWhite,
});

const PoemFooter = styled.div({
  padding: "0.6em",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
  borderTop: `0.15em solid ${colors.darkGray}`,
  "& h5": {
    margin: 0,
  },
  background: colors.bg2,
  color: colors.eggShellWhite
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
  color: colors.eggShellWhite,
  background: colors.test,
  // border: "0.15rem solid gray",
  border: `0.10em solid ${colors.darkGray}`,
  borderRadius: "0.3rem",
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
    fill: colors.eggShellWhite
  }
});

const UserButton = styled(UserIcon)({
  height: "1.5em",
  width: "1.5em",
  transition: "fill 0.1s ease",
  margin: "0 0.2em 0 0",
  "& path": {
    fill: "currentcolor",
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
  color: colors.leatherBlack,
  fontSize: "1.2em",
  fontWeight: 500,

  "&::after": {
    content: "''",
    animation: `${dots} 1.5s steps(4, end) infinite`,
  },
});
