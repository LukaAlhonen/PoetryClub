import styled from "@emotion/styled";
import { useFragment, type FragmentType } from "../../__generated__";
import { INCREMENT_POEM_VIEWS, POEM_DETAIL_FRAGMENT } from "./poem-detail.graphql";
import { dateFormatter } from "../../utils/formatters";
import { Link } from "react-router-dom";
import colors from "../../colors";
import LikeButton from "../LikeButton/like-button";
import { useMutation } from "@apollo/client/react";

import UserIcon from "../../assets/icons/user.svg?react";
import CommentSVG from "../../assets/icons/comment.svg?react";
import ThumbSVG from "../../assets/icons/thumbs-up.svg?react";
import ViewsIcon from "../../assets/icons/eye3.svg?react";
import type { IncrementPoemViewsMutation, IncrementPoemViewsMutationVariables } from "../../__generated__/graphql";
import { useEffect, useRef } from "react";
import { useHandleError } from "../../utils/error-handler";

interface PoemDetailProps {
  // the optional null is mainly to silence the lsp, QueryResult in the parent
  // component should already make sure that no null or undefined data is passed to this component
  poem?: FragmentType<typeof POEM_DETAIL_FRAGMENT> | null;
  onCommentButtonClick?: () => void;
  displayCommentForm?: boolean;
}

const PoemDetail = (props: PoemDetailProps) => {
  const hasIncremented = useRef(false);
  const poem = useFragment(POEM_DETAIL_FRAGMENT, props.poem);
  const handleError = useHandleError();
  const [incrementPoemViewsMutation] = useMutation<IncrementPoemViewsMutation, IncrementPoemViewsMutationVariables>(INCREMENT_POEM_VIEWS, {
    onError(error) {
      handleError({ error });
    },
    update(cache){
      const cachedPoem = cache.identify({ __typename: "Poem", id: poem?.id })
      if (cachedPoem) {
        cache.modify({
          id: cachedPoem,
          fields: {
            views(existingCount = 0){
              return existingCount + 1
            }
          }
        })
      }
    }
  })

  useEffect(() => {
    if (poem?.id && !hasIncremented.current) {
      incrementPoemViewsMutation({ variables: { poemId: poem.id } })
      hasIncremented.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poem?.id])

  const date = poem?.datePublished
    ? dateFormatter(poem.datePublished)
    : "loading...";

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
            <LikeButton poemId={poem?.id} likedByCurrentUser={poem?.likedByCurrentUser}>
              <LikeIcon/>
              <span data-testid="likesCount">
                {poem?.likesCount}
              </span>
            </LikeButton>
            <CommentsButton data-testid={`comments-button-${poem?.id}`} open={props.displayCommentForm} onClick={props.onCommentButtonClick}>
              <CommentIcon />
              <span data-testid="commentsCount">
                {poem?.commentsCount}
              </span>
            </CommentsButton>
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
  marginTop: "1rem",
});

const PoemContainer = styled.div({
  boxSizing: "border-box",
  borderRadius: "0.5em",
  border: "0.15em solid gray",
  display: "flex",
  flexDirection: "column",
  background: colors.eggShellWhite,
  color: colors.leatherBlack,
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
  color: colors.leatherBlack,
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
  color: colors.leatherBlack,
  background: colors.eggShellWhite,
  transition: "color 0.1s ease-in-out, background 0.1s ease-in-out",
  marginRight: "auto",
  fontWeight: "bold",
  alignItems: "center",
  display: "flex",
  border: `0.15em solid gray`,
  "&:hover": {
    color: colors.eggShellWhite,
    background: colors.wineRed
  },
  "&:hover path": {
    fill: colors.eggShellWhite
  },
});

const TextContainer = styled.div({
  display: "flex",
  padding: "2em",
  whiteSpace: "pre-wrap",
  alignSelf: "center",
  textWrap: "wrap",
  minHeight: "20em"
});

const UserButton = styled(UserIcon)({
  height: "1.5em",
  width: "1.5em",
  transition: "fill 0.1s ease",
  margin: "0 0.5em 0 0",
  "& path": {
    fill: colors.leatherBlack,
    transition: "fill 0.1s ease"
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
  color: colors.leatherBlack
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
  alignItems: "center"
});

// Icons

const svgButtonStyles = {
  width: "1.15em",
  margin: "0 0.5em 0 0.5em",
  height: "1.15em",
};

const CommentsButton = styled.button<{ open?: boolean }>(({open}) => ({
  display: "flex",
  height: "2.1rem",
  minWidth: "3.2rem",
  color: open ? colors.eggShellWhite : colors.leatherBlack,
  background: open ? colors.wineRed : colors.eggShellWhite,
  border: "0.15rem solid gray",
  borderRadius: "0.5rem",
  padding: "0.2rem 0.3rem 0.2rem 0.3rem",
  alignItems: "center",
  marginLeft: "0.5rem",
  font: "inherit",
  fontFamily: "inherit",
  fontSize: "inherit",
  fontWeight: "inherit",
  "&:hover": {
    background: colors.wineRed,
    color: colors.eggShellWhite,
    cursor: "pointer"
  }
}))

const CommentIcon = styled(CommentSVG)({
  width: "1.5rem",
  height: "1.5rem",
  marginRight: "0.3rem",
  "& path": {
    fill: "currentcolor"
  }
})

const LikeIcon = styled(ThumbSVG)({
  width: "1.5rem",
  height: "1.5rem",
  marginRight: "0.3rem",
  "& path": {
    fill: "currentcolor"
  }
})

const ViewsButton = styled(ViewsIcon) ({
  ...svgButtonStyles,
  "& path": {
    fill: colors.leatherBlack
  }
});
