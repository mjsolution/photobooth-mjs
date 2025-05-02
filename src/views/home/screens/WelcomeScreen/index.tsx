"use client";

import {
  Box,
  CircularProgress,
  Stack,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { Dispatch, FC, SetStateAction } from "react";
import { useClient } from "@src/hooks/useClient";
import { Screen } from "@src/contexts/PhotoboothProvider";
import Image from "next/image";

// Types

type WelcomeScreenProps = {
  setScreen: Dispatch<SetStateAction<Screen>>;
};

// Components

const ScreenWrapper = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.Green100.main,
  maxWidth: "100vw",
  minHeight: "100vh",
  maxHeight: "100vh",
  position: "relative",
  overflow: "hidden",

  [theme.breakpoints.down("xl")]: {
    maxWidth: "100vw",
    minHeight: "100vh",
    maxHeight: "100vh",
  },
}));

const Video = styled("video")(() => ({
  width: "100%",
  position: "absolute",
}));

const Source = styled("source")(() => ({}));

// Main Component

const WelcomeScreen: FC<WelcomeScreenProps> = ({ setScreen }) => {
  const isClient = useClient();

  const portrait = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("xl")
  );

  return (
    <ScreenWrapper alignItems="center" justifyContent="center">
      {isClient && (
        <>
          <Video autoPlay muted loop>
            <Source
              type="video/webm"
              src={`/static/${portrait ? "potrait-looping.webm" : "looping.webm"}`}
            />
          </Video>

          <Box
            position="relative"
            width="450.17px"
            height="448px"
            onClick={() => setScreen("layout")}
          >
            <Image src="/static/start-photobooth.png" alt="start-button" fill />
          </Box>
        </>
      )}

      {!isClient && (
        <CircularProgress size="100px" sx={{ color: "Green300.main" }} />
      )}
    </ScreenWrapper>
  );
};

export default WelcomeScreen;
