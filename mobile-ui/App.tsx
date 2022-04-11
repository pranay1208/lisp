import React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import Router from "./src/Router";
import { LinearGradient } from "expo-linear-gradient";

const App = () => {
  const config = {
    dependencies: {
      "linear-gradient": LinearGradient,
    },
  };

  const theme = extendTheme({
    colors: {
      primary: {
        100: "#EC83A4",
        200: "#E97298",
        300: "#E6608B",
        400: "#E34F7E",
        500: "#E13D71",
        600: "#DE2B64",
        700: "#D4215A",
      },
      secondary: {
        400: "#C62DC6",
      },
      accent: {
        400: "#2E2532",
      },
      white: {
        400: "#FEFEFE",
      },
      yellow: {
        400: "#F8C630",
      },
      red: {
        400: "#E9190C",
      },
    },
  });
  return (
    <NativeBaseProvider theme={theme} config={config}>
      <Router />
    </NativeBaseProvider>
  );
};

export default App;
