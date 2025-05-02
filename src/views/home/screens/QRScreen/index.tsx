import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [qrValue, setQrValue] = useState<string | null>(null);

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
      const fullImagePath = baseUrl.concat(imageData.path);

      setImageVariant((prev) => ({
        ...prev,
        [type]: fullImagePath,
      }));

      setOpenedMode(type);
      setQrValue(fullImagePath);
      setQrDialogOpen(true);
    }
  };

  const [feedLoaded, setFeedLoaded] = useState<boolean>(false);
  const [storyLoaded, setStoryLoaded] = useState<boolean>(false);
  const [normalLoaded, setNormalLoaded] = useState<boolean>(false);
  const imageLoaded = feedLoaded && storyLoaded && normalLoaded;

  const feedBackgroundSrc =
    event === "wmf"
      ? "/static/background/1-1-wmf.png"
      : "/static/background/story.png";
  const storyBackgroundSrc =
    event === "wmf"
      ? "/static/background/9-16-wmf.png"
      : "/static/background/feed.png";

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
            {/* FEED */}
            <Stack spacing={2} alignItems="center">
              <Typography textAlign="center" fontSize="30px" color="white">
                Instagram Feed
              </Typography>
              <Box
                ref={igFeedRef}
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ position: "relative", width: "300px", height: "300px", boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.4)" }}
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
              {!imageVariant.feed ? (
                <LoadingButton
                  variant="contained"
                  color="Green200"
                  size="large"
                  onClick={() => onDownload("feed")}
                  loading={isUploadingFeedImage}
                >
                  Download
                </LoadingButton>
              ) : (
                <Button
                  variant="contained"
                  color="Green200"
                  size="large"
                  onClick={() => {
                    setQrValue(imageVariant.feed!);
                    setQrDialogOpen(true);
                  }}
                >
                  Open QR
                </Button>
              )}
            </Stack>

            {/* STORY */}
            <Stack spacing={2} alignItems="center">
              <Typography textAlign="center" fontSize="30px" color="white">
                Instagram Story
              </Typography>
              <Box
                ref={igStoryRef}
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ position: "relative", width: "300px", height: "533px", boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.4)" }}
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
              {!imageVariant.story ? (
                <LoadingButton
                  variant="contained"
                  color="Green200"
                  size="large"
                  onClick={() => onDownload("story")}
                  loading={isUploadingStoryImage}
                >
                  Download
                </LoadingButton>
              ) : (
                <Button
                  variant="contained"
                  color="Green200"
                  size="large"
                  onClick={() => {
                    setQrValue(imageVariant.story!);
                    setQrDialogOpen(true);
                  }}
                >
                  Open QR
                </Button>
              )}
            </Stack>

            {/* NORMAL */}
            <Stack spacing={2} alignItems="center">
              <Typography textAlign="center" fontSize="30px" color="white">
                Save Picture
              </Typography>
              <NativeImage
                src={photoResult || ""}
                alt="normal-photo"
                sx={{ width: "300px", boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.4)" }}
                onLoad={() => setNormalLoaded(true)}
              />
              {!imageVariant.normal ? (
                <LoadingButton
                  variant="contained"
                  color="Green200"
                  size="large"
                  onClick={() => onDownload("normal")}
                  loading={isUploadingNormalImage}
                >
                  Download
                </LoadingButton>
              ) : (
                <Button
                  variant="contained"
                  color="Green200"
                  size="large"
                  onClick={() => {
                    setQrValue(imageVariant.normal!);
                    setQrDialogOpen(true);
                  }}
                >
                  Open QR
                </Button>
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

      {/* QR CODE DIALOG */}
      <Dialog open={qrDialogOpen} onClose={() => setQrDialogOpen(false)}>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
            position: "relative",
          }}
        >
          <IconButton
            onClick={() => setQrDialogOpen(false)}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon sx={{ fontSize: 50 }} />
          </IconButton>
          <Typography variant="h5" mb={10}>
            Scan this QR Code
          </Typography>
          {qrValue && <QRCodeSVG value={qrValue} size={500} />}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default QRScreen;
