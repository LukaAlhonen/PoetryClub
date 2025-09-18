import styled from "@emotion/styled";

interface NavContainerProps {
  gridArea?: string; // Determine postion in grid
}

const NavContainer = styled.div<NavContainerProps>((props) => ({
  display: "flex",
  flexDirection: "column",
  position: "sticky",
  top: 0,
  gridArea: props.gridArea || "unset",
  alignSelf: "center",
  background: "blue",
  zIndex: 10,
}));

export default NavContainer;
