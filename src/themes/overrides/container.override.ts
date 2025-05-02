import { Components, Theme } from "@mui/material";

export const ContainerOverride: Components<Theme>["MuiContainer"] = {
  defaultProps: {
    disableGutters: true,
  },
  styleOverrides: {
    root: () => ({}),
  },
};
