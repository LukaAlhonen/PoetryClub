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
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { loading, error, data, fetchMore, networkStatus } = useQuery<GetPoemsWithFilterQuery, GetPoemsWithFilterQueryVariables>(GET_POEMS_WITH_FILTER, {
    variables: { first: 5, ...(searchTerm !== "" ? { filter: { filter: searchTerm } } : {}) },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first"
  });

  useEffect(() => {
    const handle = setTimeout(() => setSearchTerm(filter))
    return () => clearTimeout(handle);
  }, [filter])


  const isLoading = networkStatus === NetworkStatus.fetchMore;

  const handleIntersect = () => {
    if (data?.poems?.pageInfo?.hasNextPage) {
      fetchMore({ variables: { first: data.poems.pageInfo.pageSize, after: data.poems.pageInfo.endCursor } })
    }
  }

  return (
    <Layout>
      <ScrollContainer onIntersect={handleIntersect}>
        <SearchBar>
          <SearchButton />
          <SearchInput value={filter} onChange={(e) => {
            setFilter(e.target.value)
          }} />
        </SearchBar>
        <QueryResult data={data} loading={loading} error={error}>
          <PoemGrid poems={data?.poems} isLoading={isLoading} />
        </QueryResult>
      </ScrollContainer>
    </Layout>
  )
}

export default Search;

const SearchBar = styled.div({
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
  marginLeft: "0.5em",
  "& path": {
    fill: colors.backgroundBlack,
    transition: "fill 0.15s ease",
  },
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
  }
})
