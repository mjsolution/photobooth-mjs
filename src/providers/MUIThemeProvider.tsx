"use client";

import { ThemeProvider } from "@mui/material";
import { theme } from "@src/themes";
import React, { FC, PropsWithChildren } from "react";

const MUIThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MUIThemeProvider;
