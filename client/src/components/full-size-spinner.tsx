import styled from "@emotion/styled";
import colors from "../colors";
import Spinner from "./spinner";

const FullSizeSpinner = () => {
  return (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  )
}

export default FullSizeSpinner;

const SpinnerContainer = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  flexGrow: 1,
  minHeight: "100vh",
  boxSizing: "border-box",
  background: colors.backgroundBlack,
});
