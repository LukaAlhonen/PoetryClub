import React from "react";
import styled from "@emotion/styled";
import LeftNav from "./left-nav";
import colors from "../colors";
import { Link } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <LayoutContainer>
      <LeftNav></LeftNav>
      <HeaderContainer><TitleContainer to="/">PoetryClub</TitleContainer></HeaderContainer>
      <PageContainer data-scroll-container>{children}</PageContainer>
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
  // columnGap: "5px",
  background: colors.backgroundBlack,
  boxSizing: "border-box"
});

const PageContainer = styled.div({
  gridArea: "page-container",
  width: "100%",
  height: "100%",
  overflowY: "scroll",
  boxSizing: "border-box",
  paddingLeft: "1em",
  paddingRight: "0.3em",
  maxWidth: "100%",
  // border: ,
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
  background: colors.backgroundBlack,
  color: colors.textEggshell,
  // borderBottom: "0.15rem solid gray",
  boxSizing: "border-box",
});

const TitleContainer = styled(Link)({
  textDecoration: "none",
  color: colors.textEggshell,
  position: "relative",
  backgroundImage: `linear-gradient(${colors.wineRed}, ${colors.wineRed})`,
  backgroundPosition: "0 100%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "0% 0.1em", // 👈 start hidden
  transition: "none",

  "&:hover": {
  transition: "color 0.2s ease, background-size 0.2s ease",
    backgroundSize: "100% 0.1em", // 👈 expands left → right
    color: colors.wineRed,
  },
})
