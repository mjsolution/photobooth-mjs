"use client";

import React, { FC, PropsWithChildren } from "react";
import { MaterialDesignContent, SnackbarProvider } from "notistack";
import { styled } from "@mui/material/styles";

const StyledMaterialDesignContent = styled(MaterialDesignContent)(
  ({ theme }) => ({
    fontFamily: "Inter, sans-serif",

    "&.notistack-MuiContent-success": {
      backgroundColor: theme.palette.Green.main,
    },

    "&.notistack-MuiContent-error": {
      backgroundColor: theme.palette.Red.main,
    },

    "&.notistack-MuiContent-info": {
      backgroundColor: theme.palette.Blue.main,
    },

    "&.notistack-MuiContent-warning": {
      backgroundColor: theme.palette.Yellow.main,
    },
  })
);

const NotistackProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SnackbarProvider
      Components={{
        success: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
        warning: StyledMaterialDesignContent,
        info: StyledMaterialDesignContent,
      }}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default NotistackProvider;
