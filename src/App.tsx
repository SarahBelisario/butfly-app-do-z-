import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";

import { Routes } from "./routes";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}
