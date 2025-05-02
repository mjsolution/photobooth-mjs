import { Box, Container, Grid2, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@src/components/Paper";
import { PhotoboothContext } from "@src/contexts/PhotoboothProvider";
import React, { useContext, useRef } from "react";
import NextImage from "next/image";
import SendOptionMenu from "./components/SendOptionMenu";
import html2canvas from "html2canvas";
import { resizeBase64Image } from "@src/helpers/resizeBase64Image";

const NativeImage = styled("img")(() => ({}));

const layouts = {
  1: { size: 12, height: { xs: "788.44px", xl: "595.5px" } },
  2: { size: 12, height: { xs: "376.57px", xl: "284.42px" } },
  4: { size: 6, height: { xs: "376.57px", xl: "284.42px" } },
};

const PreviewScreen = () => {
  const { layout, photos, selectedFrame, setPhotoResult } =
    useContext(PhotoboothContext);

  const photoResultRef = useRef<HTMLDivElement | null>(null);

  const savePhotoResult = async () => {
    if (photoResultRef.current) {
      const canvas = await html2canvas(photoResultRef.current, { scale: 10 });
      const imgData = canvas.toDataURL("image/png");
      const resized = await resizeBase64Image(imgData, 1200, 1800);
      setPhotoResult(resized);
    }
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
        <Paper
          ref={photoResultRef}
          width={{ xs: "662px", xl: "500px" }}
          minWidth={{ xs: "662px", xl: "500px" }}
          height={{ xs: "993px", xl: "750px" }}
          gridProps={{
            p: { xs: "35.31px", xl: "26.67px" },
            spacing: { xs: "35.31px", xl: "26.67px" },
          }}
          position="relative"
        >
          {selectedFrame && (
            <NativeImage
              src={"/static/frames/".concat(selectedFrame || "")}
              alt="frame"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 4,
                width: "100%",
              }}
            />
          )}

          {photos.map((photo, index) => {
            const selectedLayout = layouts[layout || 1];

            return (
              <Grid2 key={index.toString()} size={selectedLayout.size}>
                <Box height={selectedLayout.height} position="relative">
                  <NextImage
                    src={photo || ""}
                    alt={`photo-`.concat(index.toString())}
                    fill
                  />
                </Box>
              </Grid2>
            );
          })}
        </Paper>

        <SendOptionMenu savePhotoResult={savePhotoResult} />
      </Stack>
    </Container>
  );
};

export default PreviewScreen;
