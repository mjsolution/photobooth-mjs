declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xmd: true;
  }
}

export const customBreakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    xmd: 1280,
    lg: 1440,
    xl: 1920,
  },
};
