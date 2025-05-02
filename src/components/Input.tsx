"use client";

import { TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const InputLabel = styled(Typography)(({ theme }) => ({
  ...theme.typography.Caption1Bold,
  color: theme.palette.Neutral100.main,
  marginBottom: "4px",
}));

export const Input = styled(TextField)(({ theme }) => ({
  borderRadius: "16px",

  "& .MuiOutlinedInput-root": {
    ...theme.typography.Subheading1,
    color: "white",
    paddingRight: 0,

    fieldset: {
      borderWidth: "2px",
      borderColor: "white",
    },

    "&.Mui-focused fieldset": {
      borderColor: theme.palette.Green300.main,
    },

    "&.MuiInputBase-root": { padding: 0 },

    "& textarea": {
      padding: "8px 12px!important",
    },

    "& .MuiInputBase-input": {
      padding: "16px 24px",
    },
  },
  "& .MuiFormHelperText-root": {
    marginTop: "12px",
    fontSize: "18px",
  },
}));
