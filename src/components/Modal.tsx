import { Clear } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React, { ComponentProps, FC, PropsWithChildren } from "react";

interface ModalProps extends PropsWithChildren, ComponentProps<typeof Dialog> {
  open: boolean;
  onClose: () => void;
  action?: JSX.Element;
}

const Modal: FC<ModalProps> = ({
  open,
  onClose,
  children,
  action,
  ...props
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      {...props}
      PaperProps={{
        sx: { backgroundColor: "Green200.main" },
      }}
    >
      <DialogTitle p="20px !important">
        <IconButton onClick={onClose}>
          <Clear sx={{ fontSize: "60px", color: "white" }} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: "0px 48px 48px 48px !important" }}>
        {children}
      </DialogContent>

      {Boolean(action) && (
        <DialogActions
          sx={{
            p: "16px 24px",
            borderTop: "2px solid",
            borderColor: "Neutral700.main",
          }}
        >
          {action}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Modal;
