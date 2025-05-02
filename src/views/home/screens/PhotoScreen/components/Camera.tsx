"use client";

import { CameraAltOutlined } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  PhotoboothContext,
  PhotoFilter,
} from "@src/contexts/PhotoboothProvider";
import Image from "next/image";
import React, {
  Dispatch,
  FC,
  RefObject,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Webcam from "react-webcam";

// Types

type CameraProps = {
  cameraHeight: number;
  index: number;
  photos: (string | null)[];
  setPhotos: Dispatch<SetStateAction<(string | null)[]>>;
  latestCameraIndex: number;
  setLatestCameraIndex: Dispatch<SetStateAction<number>>;
  retakeCameraIndex: number | null;
  setRetakeCameraIndex: Dispatch<SetStateAction<number | null>>;
};

type CameraViewProps = {
  photo: string | null;
  isTimerOn: boolean;
  timeLeft: number;
  startCaptureTimer: (index: number) => void;
  handleRetake: (index: number) => void;
  index: number;
  latestCameraIndex: number;
  retakeCameraIndex: number | null;
  cameraWidth: number;
  cameraHeight: number;
  webcamRef: RefObject<Webcam>;
  selectedFilter: PhotoFilter | null;
  selectedMenu: string | null;
};

// Components

const CameraIconWrapper = styled(Stack)(({ theme }) => ({
  position: "absolute",
  zIndex: 5,
  padding: "24px",
  backgroundColor: theme.palette.Green200.main,
  borderRadius: "100%",
  bottom: "20px",
  left: "50%",
  transform: "translate(-50%)",
  cursor: "pointer",
}));

const LoaderWrapper = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 3,
}));

const TimeLeftText = styled(Typography)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}));

const SpinnerWrapper = styled(Box)(() => ({
  position: "relative",
  width: "180px",
  height: "180px",

  "@keyframes loader": {
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(-360deg)",
    },
  },

  animation: "loader 1s linear infinite",
}));

const RetakeButton = styled(Button)(() => ({
  position: "absolute",
  zIndex: 5,
  bottom: "20px",
  right: "20px",
}));

// Helper Components

const CameraView: FC<CameraViewProps> = ({
  photo,
  isTimerOn,
  timeLeft,
  startCaptureTimer,
  handleRetake,
  index,
  // latestCameraIndex,
  retakeCameraIndex,
  cameraWidth,
  cameraHeight,
  webcamRef,
  selectedFilter,
  selectedMenu,
}) => {
  const showCaptureButton =
    !selectedMenu &&
    !isTimerOn &&
    !photo &&
    (retakeCameraIndex === index || retakeCameraIndex === null);
  const showLoader = isTimerOn;
  const showRetakeButton = photo && retakeCameraIndex === null;
  const showPhoto = photo;
  const showWebcam =
    !photo && (retakeCameraIndex === index || retakeCameraIndex === null);

  return (
    <>
      {showCaptureButton && (
        <CameraIconWrapper onClick={() => startCaptureTimer(index)}>
          <CameraAltOutlined sx={{ fontSize: "54px", color: "white" }} />
        </CameraIconWrapper>
      )}

      {showLoader && (
        <LoaderWrapper>
          <TimeLeftText typography="Heading1" color="white">
            {Boolean(timeLeft) && timeLeft}
          </TimeLeftText>

          <SpinnerWrapper>
            <Image src="/static/icon/loader.png" alt="loader" fill />
          </SpinnerWrapper>
        </LoaderWrapper>
      )}

      {showRetakeButton && (
        <RetakeButton
          color="Green100"
          size="large"
          onClick={() => handleRetake(index)}
        >
          Retake
        </RetakeButton>
      )}

      {showPhoto && (
        <Image
          src={photo}
          alt="photo"
          fill
          style={{ filter: selectedFilter?.value || "none" }}
        />
      )}

      {showWebcam && (
        <Webcam
          screenshotQuality={100}
          ref={webcamRef}
          audio={false}
          mirrored
          width={cameraWidth}
          height={cameraHeight}
          videoConstraints={{ width: cameraWidth, height: cameraHeight }}
          screenshotFormat="image/jpeg"
          style={{ filter: selectedFilter?.value }}
        />
      )}
    </>
  );
};

// Main Component

const Camera: FC<CameraProps> = ({
  index,
  cameraHeight,
  photos,
  setPhotos,
  latestCameraIndex,
  setLatestCameraIndex,
  retakeCameraIndex,
  setRetakeCameraIndex,
}) => {
  const { selectedFilter, selectedCurrentFilter, selectedMenu } =
    useContext(PhotoboothContext);

  const webcamRef = useRef<Webcam>(null);
  const cameraWrapperRef = useRef<HTMLDivElement>(null);

  const [cameraWrapperWidth, setCameraWrapperWidth] = useState<number>(0);
  const [isTimerOn, setIsTimerOn] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(3); // In Seconds

  const cameraWidth = cameraWrapperWidth;

  const updateFrameWidth = () => {
    setCameraWrapperWidth(cameraWrapperRef.current?.clientWidth || 0);
  };

  useEffect(() => {
    updateFrameWidth();

    window.addEventListener("resize", updateFrameWidth);

    return () => {
      window.removeEventListener("resize", updateFrameWidth);
    };
  }, []);

  const capture = useCallback(
    (index: number) => {
      const webcamEl = webcamRef.current;

      if (webcamEl) {
        const imageSrc = webcamEl.getScreenshot();

        if (imageSrc) {
          setPhotos((prev) => {
            const newPhotos = [...prev];
            newPhotos[index] = imageSrc;

            return newPhotos;
          });
        }
      }
    },
    [setPhotos]
  );

  const startCaptureTimer = useCallback(
    (index: number) => {
      setIsTimerOn(true);
      let countdown = 3;

      const intervalId = setInterval(() => {
        setTimeLeft(countdown);

        if (countdown === 0) {
          clearInterval(intervalId);
          capture(index);
          setIsTimerOn(false);
          setLatestCameraIndex(index + 1);
          setRetakeCameraIndex(null);
        }

        countdown -= 1;
      }, 1000);
    },
    [capture, setLatestCameraIndex, setRetakeCameraIndex]
  );

  const handleRetake = (index: number) => {
    setRetakeCameraIndex(index);

    setPhotos((prev) => {
      const newPhotos = [...prev];
      newPhotos[index] = null;

      return newPhotos;
    });
  };

  return (
    <Box
      ref={cameraWrapperRef}
      bgcolor="BackgroundSecondary.main"
      height={`${cameraHeight}px`}
      position="relative"
    >
      {index === 0 && (
        <CameraView
          photo={photos[index]}
          webcamRef={webcamRef}
          cameraHeight={cameraHeight}
          cameraWidth={cameraWidth}
          latestCameraIndex={latestCameraIndex}
          retakeCameraIndex={retakeCameraIndex}
          index={index}
          handleRetake={handleRetake}
          isTimerOn={isTimerOn}
          startCaptureTimer={startCaptureTimer}
          timeLeft={timeLeft}
          selectedFilter={selectedCurrentFilter || selectedFilter}
          selectedMenu={selectedMenu}
        />
      )}

      {index > 0 && photos[index - 1] !== undefined && (
        <CameraView
          photo={photos[index]}
          webcamRef={webcamRef}
          cameraHeight={cameraHeight}
          cameraWidth={cameraWidth}
          latestCameraIndex={latestCameraIndex}
          retakeCameraIndex={retakeCameraIndex}
          index={index}
          handleRetake={handleRetake}
          isTimerOn={isTimerOn}
          startCaptureTimer={startCaptureTimer}
          timeLeft={timeLeft}
          selectedFilter={selectedCurrentFilter || selectedFilter}
          selectedMenu={selectedMenu}
        />
      )}
    </Box>
  );
};

export default Camera;
