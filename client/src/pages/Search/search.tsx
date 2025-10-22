import { Layout } from "../../components";
import { useQuery } from "@apollo/client/react";
import { GET_POEMS_WITH_FILTER } from "./search.graphql";
import type { GetPoemsWithFilterQuery, GetPoemsWithFilterQueryVariables } from "../../__generated__/graphql";
import { NetworkStatus } from "@apollo/client";
import PoemGrid from "../../components/PoemGrid/poem-grid";
import QueryResult from "../../components/query-result";
import ScrollContainer from "../../components/ScrollContainer/scroll-container";
import styled from "@emotion/styled";
import colors from "../../colors";
import SearchIcon from "../../assets/icons/search.svg?react";
import { useState, useEffect } from "react";

const Search = () => {
  const [filter, setFilter] = useState<string>("");

  const { loading, error, data, fetchMore, refetch, networkStatus } = useQuery<GetPoemsWithFilterQuery, GetPoemsWithFilterQueryVariables>(GET_POEMS_WITH_FILTER, {
    variables: { first: 5, },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first"
  });

  useEffect(() => {
    refetch({ filter: { titleContains: filter} });
  }, [filter, refetch])


  const isLoading = networkStatus === NetworkStatus.fetchMore;

  const handleIntersect = () => {
    if (data?.poems?.pageInfo?.hasNextPage) {
      fetchMore({ variables: { first: data.poems.pageInfo.pageSize, after: data.poems.pageInfo.endCursor } })
    }
  }

  if (networkStatus === NetworkStatus.refetch) console.log("refetching")

  return (
    <Layout>
      <ScrollContainer onIntersect={handleIntersect}>
        <SearchBar onSubmit={(e) => {
          e.preventDefault();
          refetch({ filter: { titleContains: filter} });
          setFilter("")
        }}>
          <SearchButtonContainer type="submit">
            <SearchButton />
            Search
          </SearchButtonContainer>
          <SearchInput value={filter} onChange={(e) => {
            setFilter(e.target.value)
          }} />
        </SearchBar>
        <QueryResult data={data} loading={loading} error={error}>
          <PoemGrid poems={data} isLoading={isLoading} />
        </QueryResult>
      </ScrollContainer>
    </Layout>
  )
}

export default Search;

const SearchBar = styled.form({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  borderRadius: "0.5em",
  padding: "0.5em",
  margin: "1em",
  background: colors.textEggshell
})

const SearchButton = styled(SearchIcon)({
  width: "1.5em",
  height: "1.5em",
  marginRight: "0.5em",
  "& path": {
    fill: "currentcolor",
    transition: "fill 0.15s ease",
  },
  "&:hover path": {
    fill: colors.textEggshell,
  }
})

const SearchButtonContainer = styled.button({
  // margin: "0.5em",
  padding: "0.5em",
  boxSizing: "border-box",
  borderRadius: "0.5em",
  display: "flex",
  alignItems: "center",
  background: colors.textEggshell,
  color: colors.backgroundBlack,
  border: `0.15em solid ${colors.backgroundBlack}`,
  transition: "background 0.15s ease-in-out, color 0.15s ease-in-out, border 0.15s ease-in-out",
  fontSize: "1em",
  "&:hover": {
    cursor: "pointer",
    background: colors.wineRed,
    color: colors.textEggshell,
    border: `0.15em solid ${colors.wineRed}`,
  }
})

const SearchInput = styled.input({
  width: "100%",
  height: "2.4em",
  border: `0.15em solid ${colors.backgroundBlack}`,
  background: colors.textEggshell,
  margin: "0.5em",
  padding: "0.3em",
  boxSizing: "border-box",
  fontSize: "1.1em",
  borderRadius: "0.5em",
  "&:focus": {
    outline: "none",
    border: `0.15em solid ${colors.wineRed}`
  },
  "&:hover": {
    border: `0.15em solid ${colors.wineRed}`,
    // cursor: "horizontal-text"
  }
})
