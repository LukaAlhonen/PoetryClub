import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { ApolloError } from "@apollo/client";
import type { ReactNode } from "react";
import colors from "../colors";

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

const rotation = keyframes`
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
`;

const Spinner = styled.div({
  width: "48px",
  height: "48px",
  border: `5px solid ${colors.accent}`,
  borderBottomColor: "transparent",
  borderRadius: "50%",
  display: "inline-block",
  boxSizing: "border-box",
  animation: `${rotation} 1s linear infinite`,
});
