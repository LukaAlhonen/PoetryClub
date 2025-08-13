import styled from "@emotion/styled";
import { ApolloError } from "@apollo/client";
import type { ReactNode } from "react";
import Spinner from "./spinner";

interface QueryResultProps {
  loading: boolean;
  error?: ApolloError | null;
  data?: unknown;
  children: ReactNode;
}

const QueryResult = ({ loading, error, data, children }: QueryResultProps) => {
  if (loading)
    return (
      <SpinnerContainer>
        <Spinner></Spinner>
      </SpinnerContainer>
    );
  if (error) return <div>Error: {error.message}</div>;
  if (data) return <>{children}</>;
  return <div>Nothing here :(</div>;
};

export default QueryResult;

const SpinnerContainer = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100vh",
});
