import React, { Dispatch, FC, SetStateAction, useContext } from "react";
import { Box, Container, Grid2, Stack, Typography } from "@mui/material";
import {
  NumberOfLayout,
  PhotoboothContext,
  Screen,
} from "@src/contexts/PhotoboothProvider";
import Paper from "@src/components/Paper";

// Types

type LayoutScreenProps = {
  setScreen: Dispatch<SetStateAction<Screen>>;
};

// Main Component

const layouts: {
  id: number;
  layout: NumberOfLayout;
  gridSize: number;
  height: string;
}[] = [
  { id: 1, layout: 1, gridSize: 12, height: "357.3px" },
  { id: 2, layout: 2, gridSize: 12, height: "170.65px" },
  { id: 3, layout: 4, gridSize: 6, height: "170.65px" },
];

const LayoutScreen: FC<LayoutScreenProps> = ({ setScreen }) => {
  const { setLayout } = useContext(PhotoboothContext);

  return (
    <Container>
      <Stack minHeight="100vh" alignItems="center" justifyContent="center">
        <Typography
          sx={{
            fontSize: "45px",
            fontWeight: 600,
            lineHeight: "54.46px",
            color: "white",
            mb: { xs: "150px", xl: "61px" },
          }}
        >
          Select Frame
        </Typography>

        <Stack
          direction="row"
          spacing={{ xs: 5, xl: 8 }}
          flexWrap="wrap"
          maxWidth={{ xs: "900px", xl: "unset" }}
          justifyContent={{ xs: "center", xl: "flex-start" }}
          useFlexGap
        >
          {layouts.map((layout) => (
            <Stack key={layout.id} spacing={4}>
              <Paper
                width="300px"
                height="450px"
                gridProps={{ p: 2, spacing: 2 }}
                onClick={() => {
                  setLayout(layout.layout);
                  setScreen("photo");
                }}
              >
                {[...Array(layout.layout)].map((_, index) => (
                  <Grid2 key={index} size={layout.gridSize}>
                    <Box
                      bgcolor="BackgroundSecondary.main"
                      height={layout.height}
                    />
                  </Grid2>
                ))}
              </Paper>

              <Typography textAlign="center" fontSize="24px" color="white">
                {layout.layout} {layout.layout > 1 ? "Frames" : "Frame"}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};

export default LayoutScreen;
