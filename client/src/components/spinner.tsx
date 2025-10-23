import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import colors from "../colors";

const rotation = keyframes`
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
`;

const Spinner = styled.div({
  width: "48px",
  height: "48px",
  border: `5px solid ${colors.wineRed}`,
  borderBottomColor: "transparent",
  borderRadius: "50%",
  display: "inline-block",
  boxSizing: "border-box",
  animation: `${rotation} 1s linear infinite`,
});

export default Spinner;
