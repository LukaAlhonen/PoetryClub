import { Global } from "@emotion/react";
// import colors from "./colors";

// TODO: add global styles lol
const GlobalStyles = () => {
  return (
    <Global
      styles={[
        {
          "@import":
            "url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap')",
        },
        {
          html: {
            height: "100%",
            scrollBehavior: "smooth"
          },

          body: {
            margin: 0,
            padding: 0,
            fontFamily: "'JetBrains Mono', monospace",
          },

          "*": {
            boxSizing: "border-box",
          },

          ":root": {},
        },
      ]}
    />
  );
};

export default GlobalStyles;
