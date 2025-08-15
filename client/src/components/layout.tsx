import { Footer, Header } from "../components";
import React from "react";
import styled from "@emotion/styled";
import colors from "../colors";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <LayoutContainer>
      <Header />
      <PageContainer>{children}</PageContainer>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const PageContainer = styled.div({
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
  flexWrap: "wrap",
  alignSelf: "center",
  flexGrow: 1,
  width: "100%",
  paddingBottom: 8 * 5,
  paddingTop: "20px",
  backgroundColor: colors.secondary,
});
