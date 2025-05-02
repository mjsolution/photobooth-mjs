import { LocalPrintshopOutlined } from "@mui/icons-material";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Modal from "@src/components/Modal";
import { PhotoboothContext } from "@src/contexts/PhotoboothProvider";
import React, { FC, useContext, useRef, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useReactToPrint } from "react-to-print";

type PrintModalProps = {
  open: boolean;
  onClose: () => void;
};

const Image = styled("img")(() => ({}));

const PrintModal: FC<PrintModalProps> = ({ open, onClose }) => {
  const { photoResult } = useContext(PhotoboothContext);

  const imageRef = useRef<HTMLImageElement | null>(null);
  const onPrint = useReactToPrint({ contentRef: imageRef });

  const [isPhotoOnLoad, setIsPhotoOnLoad] = useState<boolean>(true);

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: { xs: "800px", xl: "700px" },
          },
        },
      }}
    >
      <Stack
        color="white"
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        mb={3}
      >
        <LocalPrintshopOutlined sx={{ fontSize: "60px" }} />
        <Typography fontSize="30px">Print</Typography>
      </Stack>

      <Stack spacing={3} alignItems="center">
        <Image
          ref={imageRef}
          src={photoResult || ""}
          alt="photo-result"
          sx={{ width: "400px", display: isPhotoOnLoad ? "none" : "flex" }}
          className="printable-image"
          onLoad={() => setIsPhotoOnLoad(false)}
        />

        {isPhotoOnLoad && (
          <Stack
            width="400px"
            height="600px"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress sx={{ color: "white" }} />
          </Stack>
        )}

        <LoadingButton
          sx={{ minWidth: "275px" }}
          variant="contained"
          color="Green100"
          size="large"
          disabled={isPhotoOnLoad}
          onClick={() => {
            onPrint();
            onClose();
          }}
        >
          Print
        </LoadingButton>
      </Stack>
    </Modal>
  );
};

export default PrintModal;
