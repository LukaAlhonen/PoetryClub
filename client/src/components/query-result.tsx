import styled from "@emotion/styled";
import type { ReactNode } from "react";
import Spinner from "./spinner";
import type { ErrorLike } from "@apollo/client";

interface QueryResultProps {
  loading: boolean;
  error?: ErrorLike | null;
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

const SpinnerContainer = styled.div({});
