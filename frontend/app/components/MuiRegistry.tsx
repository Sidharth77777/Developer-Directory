"use client";

import * as React from "react";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";

export const muiCache = createCache({
  key: "mui",
  prepend: true,
});

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3B82F6",
    },
    background: {
      default: "#0f172a",
      paper: "#1e293b",
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export function MuiRegistry({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
