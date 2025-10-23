import styled from "@emotion/styled";
import { useFragment, type FragmentType } from "../../__generated__";
import { POEM_DETAIL_FRAGMENT } from "./poem-detail.graphql";
import { dateFormatter } from "../../utils/formatters";
import { Link } from "react-router-dom";
import colors from "../../colors";

import UserIcon from "../../assets/icons/user.svg?react";
import CommentsIcon from "../../assets/icons/comment.svg?react";
import LikesIcons from "../../assets/icons/heart2.svg?react";
import ViewsIcon from "../../assets/icons/eye3.svg?react";

interface PoemDetailProps {
  // the optional null is mainly to silence the lsp, QueryResult in the parent
  // component should already make sure that no null or undefined data is passed to this component
  poem?: FragmentType<typeof POEM_DETAIL_FRAGMENT> | null;
  onCommentButtonClick?: () => void;
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
            <AuthorContainer to={`/author/${poem.author.username}`}>
              <UserButton />
              {poem.author.username}
            </AuthorContainer>
            {date}
          </PoemSubHeader>
        </PoemHeader>
        <TextContainer>{poem.text}</TextContainer>
        <PoemFooter>
          <StatsContainer>
            <HoverContainer>
              <LikesButton />
            </HoverContainer>
            <span data-testid="likesCount">
              {poem?.likesCount}
            </span>
            <HoverContainer>
              <CommentsButton onClick={props.onCommentButtonClick}/>
            </HoverContainer>
            <span data-testid="commentsCount">
              {poem?.commentsCount}
            </span>
          </StatsContainer>
          <ViewsContainer>
            <ViewsButton />
            <span data-testid="views">
              {poem?.views}
            </span>
          </ViewsContainer>
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
  justifySelf: "center",
  margin: "1em"
});

const PoemContainer = styled.div({
  boxSizing: "border-box",
  borderRadius: "0.5em",
  border: "0.15em solid gray",
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
  textDecoration: "underline",
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
  transition: "color 0.1s ease-in-out, background 0.1s ease-in-out",
  marginRight: "auto",
  fontWeight: "bold",
  alignItems: "center",
  display: "flex",
  border: `0.15em solid gray`,
  "&:hover": {
    color: colors.textEggshell,
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

const ViewsContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "right",
  marginLeft: "auto",
});

const StatsContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "left",
  alignContent: "space-evenly",
});

// Icons

const svgButtonStyles = {
  width: "1.15em",
  margin: "0 0.5em 0 0.5em",
  height: "1.15em",
};

const CommentsButton = styled(CommentsIcon)<{open?: boolean}>(({ open }) =>({
  ...svgButtonStyles,
  "& path": {
    fill: open ? colors.wineRed : colors.backgroundBlack,
    transition: "fill 0.15s ease",
  },
  "&:hover path": {
    fill: colors.wineRed,
  },
}));

const LikesButton = styled(LikesIcons)({
  ...svgButtonStyles,
  "& path": {
    fill: colors.backgroundBlack,
    transition: "fill 0.1s ease-in-out",
  },
  "&:hover path": {
    fill: colors.wineRed,
  },
});

const ViewsButton = styled(ViewsIcon) ({
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
