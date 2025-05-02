"use client";

import React, { useContext } from "react";
import { Container, Stack, Theme, useMediaQuery } from "@mui/material";
import OptionSection from "./sections/OptionSection";
import Layout from "./components/Layout";
import { PhotoboothContext } from "@src/contexts/PhotoboothProvider";

const PhotoScreen = () => {
  const { layout } = useContext(PhotoboothContext);
  const portrait = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("xl")
  );

  const layouts = {
    1: { gridSize: 12, cameraHeight: portrait ? 788.4 : 595.5 },
    2: { gridSize: 12, cameraHeight: portrait ? 376.57 : 284.42 },
    4: { gridSize: 6, cameraHeight: portrait ? 376.57 : 284.42 },
  };

  return (
    <Container maxWidth={false} sx={{ maxWidth: "1306px" }}>
      <Stack
        direction={{ xs: "column", xl: "row" }}
        minHeight="100vh"
        alignItems="center"
        justifyContent={{ xs: "center", xl: "space-between" }}
        spacing={{ xs: 11, xl: 0 }}
      >
        {layout && layouts[layout] && (
          <Layout
            numberOfLayout={layout}
            gridSize={layouts[layout].gridSize}
            cameraHeight={layouts[layout].cameraHeight}
          />
        )}

        <OptionSection />
      </Stack>
    </Container>
  );
};

export default PhotoScreen;
