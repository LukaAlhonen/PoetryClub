import { Layout } from "../../components";
import { useQuery } from "@apollo/client/react";
import PoemGrid from "../../components/PoemGrid/poem-grid";
import { GET_POEMS } from "./poems.graphql";
import QueryResult from "../../components/query-result";
import { NetworkStatus } from "@apollo/client";
import type { GetPoemsQuery, GetPoemsQueryVariables } from "../../__generated__/graphql";
import ScrollContainer from "../../components/ScrollContainer/scroll-container";
import styled from "@emotion/styled";
import colors from "../../colors";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/use-auth";

const Poems = () => {
  const { userId } = useAuth();
  const { loading, error, data, fetchMore, networkStatus } = useQuery<GetPoemsQuery, GetPoemsQueryVariables>(GET_POEMS, {
    variables: { first: 5, authorId: userId },
    notifyOnNetworkStatusChange: true
  });

  const isLoading = networkStatus === NetworkStatus.fetchMore;

  const handleIntersect = () => {
    if (data?.poems?.pageInfo?.hasNextPage) {
      fetchMore({ variables: { first: data.poems.pageInfo.pageSize, after: data.poems.pageInfo.endCursor, authorId: userId } })
    }
  }

  return (
    <Layout>
      <ScrollContainer onIntersect={handleIntersect}>
        <HeaderContainer>
          <TitleContainer to="/">PoetryClub</TitleContainer>
        </HeaderContainer>
        <QueryResult loading={loading} error={error} data={data}>
          <PoemGrid poems={data?.poems} isLoading={isLoading} />
        </QueryResult>
      </ScrollContainer>
    </Layout>
  );
};

export default Poems;

const HeaderContainer = styled.div({
  display: "flex",
  width: "100%",
  height: "2em",
  gridArea: "header",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "3em",
  fontWeight: "bold",
  background: colors.backgroundBlack,
  color: colors.textEggshell,
  // borderBottom: "0.15rem solid gray",
  boxSizing: "border-box",
});

const TitleContainer = styled(Link)({
  textDecoration: "none",
  color: colors.textEggshell,
  position: "relative",
  backgroundImage: `linear-gradient(${colors.wineRed}, ${colors.wineRed})`,
  backgroundPosition: "0 100%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "0% 0.1em",
  transition: "none",

  "&:hover": {
  transition: "color 0.1s ease, background-size 0.1s ease",
    backgroundSize: "100% 0.1em",
    color: colors.wineRed,
  },
})
