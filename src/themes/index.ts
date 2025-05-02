import { createTheme } from "@mui/material";
import { customPalette } from "./palette.custom";
import { customTypography } from "./typography.custom";
import { customComponents } from "./components.custom";
import { customBreakpoints } from "./breakpoints.custom";

export const theme = createTheme({
  palette: customPalette,
  typography: customTypography,
  components: customComponents,
  breakpoints: customBreakpoints,
});
