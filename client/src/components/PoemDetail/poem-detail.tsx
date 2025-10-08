import styled from "@emotion/styled";
import { useFragment, type FragmentType } from "../../__generated__";
import { POEM_DETAIL_FRAGMENT } from "./poem-detail.graphql";
import { dateFormatter } from "../../utils/formatters";
import { Link } from "react-router-dom";

import UserIcon from "../../assets/icons/user.svg?react";
import CommentsIcon from "../../assets/icons/comment.svg?react";
import LikesIcons from "../../assets/icons/heart2.svg?react";
import ViewsIcon from "../../assets/icons/eye3.svg?react";
import colors from "../../colors";

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

  // TODO: create 404 page to redirect to
  if (!poem) {
    return (
      <PoemDetailContainer>
        <h1>Poem not found</h1>
      </PoemDetailContainer>
    );
  }

  return (
    <PoemDetailContainer>
      <PoemContainer>
        <PoemHeader>
          <PoemTitle>
          <h3>
            {poem.title}
          </h3>
          </PoemTitle>
          <PoemSubHeader>
            <AuthorContainer to="/">
              <UserButton />
              {poem.author.username}
            </AuthorContainer>
            {date}
          </PoemSubHeader>
        </PoemHeader>
        <TextContainer>{poem.text}</TextContainer>
        <PoemFooter>
          <TagsContainer>
            <ViewsButton />
            <span data-testid="views">
              {poem?.views}
            </span>
          </TagsContainer>
          <StatsContainer>
            <span data-testid="likesCount">
              {poem?.likesCount}
            </span>
            <HoverContainer>
              <LikesButton />
            </HoverContainer>
            <span data-testid="commentsCount">
              {poem?.commentsCount}
            </span>
            <HoverContainer>
              <CommentsButton />
            </HoverContainer>
          </StatsContainer>
        </PoemFooter>
      </PoemContainer>
    </PoemDetailContainer>
  );
};

export default PoemDetail;

const PoemDetailContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  maxWidth: "60em",
  width: "100%",
  minWidth: "15em",
  alignSelf: "center",
  paddingBottom: "1em"
});

const PoemContainer = styled.div({
  boxSizing: "border-box",
  borderRadius: "0.5em",
  display: "flex",
  flexDirection: "column",
  background: colors.textEggshell,
  color: colors.backgroundBlack,
})

const PoemHeader = styled.div({
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
  borderBottom: "0.15em solid gray",
  width: "100%",
  padding: "2em",
  "& h3": {
    margin: "0 0 5px 0px",
    fontSize: "2em",
  },
});

const PoemTitle = styled.div({
  textDecoration: "none",
  // alignSelf: "center",
  color: colors.backgroundBlack,
  marginBottom: "2em"
});

const PoemSubHeader = styled.div({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

// const UsernameContainer = styled(Link)({
//   "& h5": {
//     margin: "0",
//     fontSize: "15px",
//   },
//   textDecoration: "none",
//   boxSizing: "border-box",
//   padding: "0.2em",
//   borderRadius: "0.5em",
//   color: colors.backgroundBlack,
//   background: colors.textEggshell,
//   transition: "color 0.2s ease, border 0.2s ease, background 0.2s ease",
//   marginRight: "auto",
//   fontWeight: "bold",
//   alignItems: "center",
//   display: "flex",
//   border: `0.15em solid ${colors.backgroundBlack}`,
//   "&:hover": {
//     color: colors.textEggshell,
//     border: `0.15em solid ${colors.wineRed}`,
//     background: colors.wineRed
//   },
//   "&:hover path": {
//     fill: colors.textEggshell
//   },
// });

const AuthorContainer = styled(Link)({
  "& h5": {
    margin: "0",
    fontSize: "15px",
  },
  textDecoration: "none",
  boxSizing: "border-box",
  padding: "0.2em",
  borderRadius: "0.5em",
  color: colors.backgroundBlack,
  background: colors.textEggshell,
  transition: "color 0.2s ease, border 0.2s ease, background 0.2s ease",
  marginRight: "auto",
  fontWeight: "bold",
  alignItems: "center",
  display: "flex",
  border: `0.15em solid ${colors.backgroundBlack}`,
  "&:hover": {
    color: colors.textEggshell,
    border: `0.15em solid ${colors.wineRed}`,
    background: colors.wineRed
  },
  "&:hover path": {
    fill: colors.textEggshell
  },
});

const TextContainer = styled.div({
  display: "flex",
  padding: "2em",
  whiteSpace: "pre-wrap",
  alignSelf: "center"
});

const UserButton = styled(UserIcon)({
  height: "1.5em",
  width: "1.5em",
  transition: "fill 0.2s ease",
  margin: "0 0.5em 0 0",
  "& path": {
    fill: colors.backgroundBlack,
    transition: "fill 0.2s ease"
  }
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
  color: colors.backgroundBlack
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
    fill: colors.backgroundBlack,
    transition: "fill 0.15s ease",
  },
  "&:hover path": {
    fill: colors.wineRed,
  },
});

const LikesButton = styled(LikesIcons)({
  ...svgButtonStyles,
  "& path": {
    fill: colors.backgroundBlack,
    transition: "fill 0.15s ease",
  },
  "&:hover path": {
    fill: colors.wineRed,
  },
});

const ViewsButton = styled(ViewsIcon)({
  ...svgButtonStyles,
  "& path": {
    fill: colors.backgroundBlack
  }
});

const HoverContainer = styled.div({
  ":hover": {
    cursor: "pointer"
  }
})
