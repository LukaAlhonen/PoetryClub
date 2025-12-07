import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import LeftNav from "./LeftNav/left-nav";
import BurgerNav from "./burger-nav";
import colors from "../colors";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [smallScreen, setSmallScreen] = useState(window.innerWidth < 769);

  useEffect(() => {
    const handleResize = () => {
      setSmallScreen(window.innerWidth < 769)
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])
  return (
    <LayoutContainer>
      {smallScreen ? <BurgerNav></BurgerNav> : <LeftNav></LeftNav>}
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
  background: colors.bg3,
  boxSizing: "border-box",
  position: "relative",
})

const PageContainer = styled.div({
  width: "100%",
  overflow: "hidden",
  boxSizing: "border-box",
  padding: "0.5rem 0 0.5rem 0.5rem",
  border: `0.10rem solid ${colors.darkGray}`,
  margin: "0.5rem 0.5rem 0.5rem 0",
  maxWidth: "1fr",
  display: "flex",
  borderRadius: "0.5rem",
  background: colors.bg4,
  flexDirection: "column",
  justifyContent: "center",
  "@media (max-width: 769px)": {
    margin: "3rem 0 0 0",
    borderRadius: 0,
    border: "none"
  }
});
