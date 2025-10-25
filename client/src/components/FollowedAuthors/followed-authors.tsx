import styled from "@emotion/styled";
import type { GetAuthorQuery } from "../../__generated__/graphql";
import colors from "../../colors";
import FollowedAuthor from "../FollowedAuthor/followed-author";

interface FollowedAuthorsProps {
  followers?: GetAuthorQuery["authorByUsername"]["followedBy"];
  following?: GetAuthorQuery["authorByUsername"]["following"];
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
    <FollowedAuthorsContainer>
      {authors.map(author => author ? <FollowedAuthor key={author.id} author={author} /> : null)}
    </FollowedAuthorsContainer>
  )
}

export default FollowedAuthors;

const FollowedAuthorsContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
  margin: "1rem",
  background: colors.textEggshell,
  borderRadius: "0.5rem",
  border: "0.15rem solid gray"
})
