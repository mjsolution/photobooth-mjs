import { FC, useContext, useState } from "react";
import { Box, Grid2 } from "@mui/material";
import Camera from "./Camera";
import { PhotoboothContext } from "@src/contexts/PhotoboothProvider";
import Paper from "@src/components/Paper";
import Image from "next/image";

// Types

type LayoutProps = {
  numberOfLayout: number;
  cameraHeight: number;
  gridSize: number;
};

// Main Component

const Layout: FC<LayoutProps> = ({
  numberOfLayout,
  gridSize,
  cameraHeight,
}) => {
  const { photos, setPhotos, selectedFrame, selectedCurrentFrame } =
    useContext(PhotoboothContext);
  const [latestCameraIndex, setLatestCameraIndex] = useState<number>(0);
  const [retakeCameraIndex, setRetakeCameraIndex] = useState<number | null>(
    null
  );

  return (
    <Paper
      width={{ xs: "662px", xl: "500px" }}
      minWidth={{ xs: "662px", xl: "500px" }}
      height={{ xs: "993px", xl: "750px" }}
      gridProps={{
        p: { xs: "35.31px", xl: "26.67px" },
        spacing: { xs: "35.31px", xl: "26.67px" },
      }}
      position="relative"
    >
      {(selectedCurrentFrame || selectedFrame) && (
        <Box
          position="absolute"
          top={0}
          left={0}
          zIndex={4}
          width="100%"
          height={{ xs: "993px", xl: "750px" }}
        >
          <Image
            src={"/static/frames/".concat(
              selectedCurrentFrame || selectedFrame || ""
            )}
            alt="frame"
            fill
          />
        </Box>
      )}

      {[...Array(numberOfLayout)].map((_, index) => (
        <Grid2 key={index} size={gridSize}>
          <Camera
            cameraHeight={cameraHeight}
            index={index}
            photos={photos}
            setPhotos={setPhotos}
            latestCameraIndex={latestCameraIndex}
            setLatestCameraIndex={setLatestCameraIndex}
            retakeCameraIndex={retakeCameraIndex}
            setRetakeCameraIndex={setRetakeCameraIndex}
          />
        </Grid2>
      ))}
    </Paper>
  );
};

export default Layout;
