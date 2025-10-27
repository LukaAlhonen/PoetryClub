import styled from "@emotion/styled";
import type { GetAuthorQuery } from "../../__generated__/graphql";
import colors from "../../colors";
import FollowedAuthor from "../../containers/FollowedAuthor/followed-author";
import { Link } from "react-router-dom";

import BackSVG from "../../assets/icons/arrow-left.svg?react";

interface FollowedAuthorsProps {
  followers?: GetAuthorQuery["authorByUsername"]["followedBy"];
  following?: GetAuthorQuery["authorByUsername"]["following"];
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
      <AuthorLink to={props.username ? `/author/${props.username}` : "#"}><BackIcon />{props.username}</AuthorLink>
      <LinksContainer>
        <LinkContainer
          to={props.username ? `/author/${props.username}/followers` : "#"}
          isActive={props.followers ? true : false}>
            Followers
        </LinkContainer>
        <LinkContainer
          to={props.username? `/author/${props.username}/following` : "#"}
          isActive={props.following ? true : false}>
            Following
        </LinkContainer>
      </LinksContainer>
      <FollowedAuthorsContainer>
        {authors.map(author => author ? <FollowedAuthor key={author.id} author={author} /> : null)}
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
  border: "0.15rem solid gray",
  borderRadius: "0.5rem",
  background: colors.textEggshell,

})

const FollowedAuthorsContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
  borderBottomLeftRadius: "0.5rem",
  borderBottomRightRadius: "0.5rem",
  marginTop: "0",
  background: colors.textEggshell,
  borderTop: "0.15rem solid gray",
  justifySelf: "center",
})

const AuthorLink = styled(Link)({
  alignSelf: "flex-start",
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  justifyContent: "left",
  alignContent: "center",
  color: colors.backgroundBlack,
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
  paddingTop: "1em"
})

const LinkContainer = styled(Link)<{isActive?: boolean}>(
  ({isActive}) => ({
    background: isActive ? colors.wineRed : colors.darkGray,
    color: isActive ? colors.textEggshell : colors.backgroundBlack,
    padding: "1rem",
    border: "0.15rem solid gray",
    borderBottom: "none",
    borderTopLeftRadius: "0.5rem",
    borderTopRightRadius: "0.5rem",
    margin: "0",
    textDecoration: "none",
    transition: "color 0.1s ease-in-out, background 0.1s ease-in-out",
    "&:hover": {
      color: colors.textEggshell,
      background: colors.wineRed,
    }
  })
)
