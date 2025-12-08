import styled from "@emotion/styled";
import type { GetAuthorQuery } from "../../__generated__/graphql";
import colors from "../../colors";
import FollowedAuthor from "../FollowedAuthor/followed-author";
import { Link } from "react-router-dom";

import BackSVG from "../../assets/icons/arrow-left.svg?react";

interface FollowedAuthorsProps {
  followers?: GetAuthorQuery["authorByUsername"]["followedBy"];
  following?: GetAuthorQuery["authorByUsername"]["following"];
  isLoading?: boolean;
  username?: string;
}

const FollowedAuthors = (props: FollowedAuthorsProps) => {
  // check if we have followers or following
  const authors = props.followers
    ?
      props.followers.edges?.map(edge => edge.node?.follower)
    :
      props.following
      ?
        props.following?.edges.map(edge => edge.node?.following)
      :
        [];

  return (
    <Container>
      <AuthorLink data-testid={`author-link-${props.username}`} to={props.username ? `/author/${props.username}` : "#"}><BackIcon />{props.username}</AuthorLink>
      <LinksContainer>
        <LinkContainer
          data-testid={`followers-link-${props.username}`}
          to={props.username ? `/author/${props.username}/followers` : "#"}
          isActive={props.followers ? true : false}>
            Followers
        </LinkContainer>
        <LinkContainer
          data-testid={`following-link-${props.username}`}
          to={props.username? `/author/${props.username}/following` : "#"}
          isActive={props.following ? true : false}>
            Following
        </LinkContainer>
      </LinksContainer>
      <FollowedAuthorsContainer>
        {authors.map(author => author ? <FollowedAuthor key={author.id} author={author} /> : null)}
        {props.isLoading && <FollowedAuthor key={"skeleton_1"}  />}
      </FollowedAuthorsContainer>
    </Container>
  )
}

export default FollowedAuthors;

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  maxWidth: "50rem",
  width: "100%",
  justifySelf: "center",
  marginTop: "2rem",
  border: `0.10rem solid ${colors.darkGray}`,
  borderRadius: "0.5rem",
  background: colors.bg2,

})

const FollowedAuthorsContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
  borderBottomLeftRadius: "0.5rem",
  borderBottomRightRadius: "0.5rem",
  marginTop: "0",
  background: colors.bg4,
  borderTop: `0.10rem solid ${colors.darkGray}`,
  justifySelf: "center",
})

const AuthorLink = styled(Link)({
  alignSelf: "flex-start",
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  justifyContent: "left",
  alignContent: "center",
  color: colors.eggShellWhite,
  fontWeight: "bold",
  padding: "1rem",
  transition: "color 0.1s ease-in-out",
  fontSize: "1.2em",
  "&:hover": {
    color: colors.wineRed
  }
})

const BackIcon = styled(BackSVG)({
  width: "1.2rem",
  height: "1.2rem",
  marginRight: "0.5rem",
  "& path": {
    fill: "currentcolor"
  }
})

const LinksContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  paddingTop: "1em",
  background: colors.bg2,
})

const LinkContainer = styled(Link, { shouldForwardProp: (prop) => prop !== "isActive"})<{isActive: boolean}>(
  ({isActive}) => ({
    background: isActive ? colors.bg4 : colors.bg2,
    color: isActive ? colors.wineRed : colors.eggShellWhite,
    padding: "1rem",
    border: isActive ? `0.10rem solid ${colors.darkGray}` : "none",
    borderBottom: isActive ? "none" : `0.10rem solid ${colors.darkGray}`,
    fontWeight: "bold",
    borderTopLeftRadius: "0.3rem",
    borderTopRightRadius: "0.3rem",
    bottom: "-0.10rem",
    position: "relative",
    zIndex: 3,
    textDecoration: "none",
    transition: "color 0.1s ease-in-out, background 0.1s ease-in-out",
    "&:hover": {
      // color: isActive ? colors.eggShellWhite : colors.wineRed,
      color: colors.wineRed
    },
  })
)
