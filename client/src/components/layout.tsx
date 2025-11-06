import React from "react";
import styled from "@emotion/styled";
import LeftNav from "./LeftNav/left-nav";
import colors from "../colors";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <LayoutContainer>
      <LeftNav></LeftNav>
      <PageContainer>{children}</PageContainer>
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  height: "100vh",
  overflow: "hidden",
  background: colors.backgroundBlack,
  boxSizing: "border-box",
})

const PageContainer = styled.div({
  width: "100%",
  height: "100%",
  overflowY: "hidden",
  boxSizing: "border-box",
  padding: "0 0 1rem 1rem",
  maxWidth: "1fr",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});
