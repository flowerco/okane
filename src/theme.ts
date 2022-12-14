import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import "@fontsource/share-tech-mono";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  styles: {
    global: {
      html: {
        overflowY: "overlay",
      },
      body: {
        padding: 0,
        margin: 0,
        fontFamily: "Share Tech Mono",
        boxSizing: "border-box",
      },
      h1: {
        fontWeight: 900,
        fontSize: "1.2rem",
      },
      svg: {
        display: "inline",
      },
    },
  },
  config,
});

export default theme;
