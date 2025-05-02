import { LoadingButton } from "@mui/lab";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { UploadData, useUploadImage } from "@src/api/uploader";
import { PhotoboothContext } from "@src/contexts/PhotoboothProvider";
import { resizeBase64Image } from "@src/helpers/resizeBase64Image";
import html2canvas from "html2canvas";
import { QRCodeSVG } from "qrcode.react";
import React, { useContext, useRef, useState } from "react";

const NativeImage = styled("img")(() => ({}));

const QRScreen = () => {
  const { event, photoResult, setScreen, imageVariant, setImageVariant } =
    useContext(PhotoboothContext);

  const igFeedRef = useRef<HTMLDivElement | null>(null);
  const igStoryRef = useRef<HTMLDivElement | null>(null);

  const { mutateAsync: uploadFeed, isPending: isUploadingFeedImage } =
    useUploadImage();

  const { mutateAsync: uploadStory, isPending: isUploadingStoryImage } =
    useUploadImage();

  const { mutateAsync: uploadNormal, isPending: isUploadingNormalImage } =
    useUploadImage();

  const [openedMode, setOpenedMode] = useState<
    "feed" | "story" | "normal" | null
  >(null);

  const onDownload = async (type: "feed" | "story" | "normal") => {
    let imageData: UploadData | null = null;

    if (type === "feed" && igFeedRef.current) {
      const canvas = await html2canvas(igFeedRef.current, { scale: 10 });
      const imgData = canvas.toDataURL("image/png");
      const base64Image = await resizeBase64Image(imgData, 2000, 2000);
      const { data } = await uploadFeed({ base64Image, event });
      imageData = data;
    }

    if (type === "story" && igStoryRef.current) {
      const canvas = await html2canvas(igStoryRef.current, { scale: 10 });
      const imgData = canvas.toDataURL("image/png");
      const base64Image = await resizeBase64Image(imgData, 1800, 3200);
      const { data } = await uploadStory({ base64Image, event });
      imageData = data;
    }

    if (type === "normal" && photoResult) {
      const base64Image = photoResult;
      const { data } = await uploadNormal({ base64Image, event });
      imageData = data;
    }

    if (imageData) {
      const eventBucket = event || "photobooth";
      const baseUrl = `https://svtnrqfblasgxsijeyva.supabase.co/storage/v1/object/public/${eventBucket}/`;

      setImageVariant((prev) => ({
        ...prev,
        [type]: baseUrl.concat(imageData.path),
      }));

      setOpenedMode(type);

      console.log("Upload successful:", imageData);
    }
  };

  const [feedLoaded, setFeedLoaded] = useState<boolean>(false);
  const [storyLoaded, setStoryLoaded] = useState<boolean>(false);
  const [normalLoaded, setNormalLoaded] = useState<boolean>(false);

  const imageLoaded = feedLoaded && storyLoaded && normalLoaded;

  const feedBackgroundSrc =
    event === "wmf"
      ? "/static/background/1-1-wmf.png"
      : "/static/background/1-1.png";

  const storyBackgroundSrc =
    event === "wmf"
      ? "/static/background/9-16-wmf.png"
      : "/static/background/9-16.png";

  return (
    <Container maxWidth={false} sx={{ maxWidth: "1306px" }}>
      <Stack minHeight="100vh" alignItems="center" justifyContent="center">
        {!imageLoaded && (
          <Typography color="white" fontSize={{ xs: "40px", xl: "28px" }}>
            Preparing your pictures..
          </Typography>
        )}

        <Stack
          height={{ xl: "850px" }}
          justifyContent="space-between"
          display={imageLoaded ? "flex" : "none"}
        >
          <Stack
            direction="row"
            spacing={8}
            maxWidth={{ xs: "900px", xl: "unset" }}
            justifyContent={{ xs: "center", xl: "flex-start" }}
            useFlexGap
            flexWrap="wrap"
            mb={{ xs: 3, xl: "unset" }}
          >
            <Stack spacing={2} alignItems="center">
              <Typography textAlign="center" fontSize="30px" color="white">
                Instagram Feed
              </Typography>

              <Box
                ref={igFeedRef}
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  position: "relative",
                  width: "300px",
                  height: "300px",
                }}
              >
                <NativeImage
                  src={feedBackgroundSrc}
                  alt="feed-bg"
                  sx={{ width: "100%", position: "absolute" }}
                />

                <NativeImage
                  src={photoResult || ""}
                  alt="feed-photo"
                  sx={{ width: "120px", position: "relative" }}
                  onLoad={() => setFeedLoaded(true)}
                />
              </Box>

              {imageVariant.feed && openedMode !== "feed" && (
                <Button
                  variant="contained"
                  color="Green200"
                  size="large"
                  onClick={() => setOpenedMode("feed")}
                >
                  Open QR
                </Button>
              )}

              {!imageVariant.feed && (
                <LoadingButton
                  variant="contained"
                  color="Green200"
                  size="large"
                  onClick={() => onDownload("feed")}
                  loading={isUploadingFeedImage}
                >
                  Download
                </LoadingButton>
              )}

              {imageVariant.feed && openedMode === "feed" && (
                <Stack bgcolor="white" p={1}>
                  <QRCodeSVG value={imageVariant.feed} size={100} />
                </Stack>
              )}
            </Stack>

            <Stack spacing={2} alignItems="center">
              <Typography textAlign="center" fontSize="30px" color="white">
                Instagram Story
              </Typography>

              <Box
                ref={igStoryRef}
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  position: "relative",
                  width: "300px",
                  height: "533px",
                }}
              >
                <NativeImage
                  src={storyBackgroundSrc}
                  alt="story-bg"
                  sx={{ width: "100%", position: "absolute" }}
                />

                <NativeImage
                  src={photoResult || ""}
                  alt="story-photo"
                  sx={{ width: "180px", position: "relative" }}
                  onLoad={() => setStoryLoaded(true)}
                />
              </Box>

              {imageVariant.story && openedMode !== "story" && (
                <Button
                  variant="contained"
                  color="Green200"
                  size="large"
                  onClick={() => setOpenedMode("story")}
                >
                  Open QR
                </Button>
              )}

              {!imageVariant.story && (
                <LoadingButton
                  variant="contained"
                  color="Green200"
                  size="large"
                  onClick={() => onDownload("story")}
                  loading={isUploadingStoryImage}
                >
                  Download
                </LoadingButton>
              )}

              {imageVariant.story && openedMode === "story" && (
                <Box bgcolor="white" p={1}>
                  <QRCodeSVG value={imageVariant.story} size={100} />
                </Box>
              )}
            </Stack>

            <Stack spacing={2} alignItems="center">
              <Typography textAlign="center" fontSize="30px" color="white">
                Save Picture
              </Typography>

              <NativeImage
                src={photoResult || ""}
                alt="feed-photo"
                sx={{ width: "300px" }}
                onLoad={() => setNormalLoaded(true)}
              />

              {imageVariant.normal && openedMode !== "normal" && (
                <Button
                  variant="contained"
                  color="Green200"
                  size="large"
                  onClick={() => setOpenedMode("normal")}
                >
                  Open QR
                </Button>
              )}

              {!imageVariant.normal && (
                <LoadingButton
                  variant="contained"
                  color="Green200"
                  size="large"
                  onClick={() => onDownload("normal")}
                  loading={isUploadingNormalImage}
                >
                  Download
                </LoadingButton>
              )}

              {imageVariant.normal && openedMode === "normal" && (
                <Box bgcolor="white" p={1}>
                  <QRCodeSVG value={imageVariant.normal} size={100} />
                </Box>
              )}
            </Stack>
          </Stack>

          <Button
            variant="contained"
            color="Green200"
            size="large"
            sx={{ alignSelf: "flex-end", width: "200px" }}
            onClick={() => setScreen("preview")}
          >
            Done
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default QRScreen;
