import { Global } from "@emotion/react";
import colors from "./colors";

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
            background: colors.bg3
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
