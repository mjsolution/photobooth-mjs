import { Box, Grid2 } from "@mui/material";
import React, { ComponentProps, forwardRef, PropsWithChildren } from "react";

type PaperProps = {
  gridProps: ComponentProps<typeof Grid2>;
} & PropsWithChildren &
  ComponentProps<typeof Box>;

const Paper = forwardRef<HTMLDivElement, PaperProps>(
  ({ children, gridProps, ...props }, ref) => {
    return (
      <Box ref={ref} bgcolor="white" {...props}>
        <Grid2 container {...gridProps}>
          {children}
        </Grid2>
      </Box>
    );
  }
);

Paper.displayName = "Paper";

export default Paper;
