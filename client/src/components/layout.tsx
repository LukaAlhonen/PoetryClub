import React from "react";
import styled from "@emotion/styled";
import LeftNav from "./left-nav";
// import colors from "../colors";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <LayoutContainer>
      <LeftNav></LeftNav>
      <HeaderContainer>PoetryClub</HeaderContainer>
      <PageContainer>{children}</PageContainer>
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div({
  display: "grid",
  height: "100vh",
  overflow: "hidden",
  gridTemplateColumns: "auto minmax(300px, 1fr)",
  gridTemplateRows: "auto auto",
  gridTemplateAreas: `
  "left-nav header"
  "left-nav page-container"
  `,
  columnGap: "5px",
});

const PageContainer = styled.div({
  gridArea: "page-container",
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  paddingLeft: "1em",
  paddingRight: "0.3em",
  maxWidth: "100%",
});

const HeaderContainer = styled.div({
  display: "flex",
  width: "100%",
  height: "2em",
  gridArea: "header",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "3em",
  fontWeight: "bold",
});
