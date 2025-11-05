import styled from "@emotion/styled";
import { useEffect, type ReactNode } from "react";
import Spinner from "./spinner";
import type { ErrorLike } from "@apollo/client";
import { useHandleError } from "../utils/error-handler";

interface QueryResultProps {
  loading: boolean;
  error?: ErrorLike | null;
  data?: unknown;
  children: ReactNode;
}

const QueryResult = ({ loading, error, data, children }: QueryResultProps) => {
  const handleError = useHandleError();

  useEffect(() => {
    if (error) handleError({ error });
  }, [error, handleError])

  if (loading && !data)
    return (
      <SpinnerContainer>
        <Spinner></Spinner>
      </SpinnerContainer>
    );
  if (data) return <>{children}</>;

  return <div>Nothing here :(</div>;
};

export default QueryResult;

const SpinnerContainer = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  flexGrow: 1,
  minHeight: "100vh",
  boxSizing: "border-box"
});
