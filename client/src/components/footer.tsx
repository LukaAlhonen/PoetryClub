import styled from "@emotion/styled";
import colors from "../colors";

const Footer = () => {
  return (
    <FooterContainer>
      <h5>Footer</h5>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  borderTop: "1px solid black",
  backgroundColor: colors.primary,
  color: colors.secondary,
});
