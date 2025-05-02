import { Components, Theme } from "@mui/material/styles";
import { colors } from "../palette.custom";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {}

  interface ButtonPropsColorOverrides {
    Green100: true;
    Green200: true;
  }
}

export const ButtonOverride: Components<Theme>["MuiButton"] = {
  defaultProps: {
    variant: "contained",
    color: "Green200",
    size: "medium",
    disableRipple: true,
  },

  styleOverrides: {
    root: {
      textTransform: "capitalize",
      borderRadius: "4px",
      boxShadow: "none",

      "&:hover": { boxShadow: "none" },
    },

    sizeSmall: {
      padding: "8px 12px",
      fontSize: "12px",
    },
    sizeMedium: {
      padding: "8px 16px",
      fontSize: "14px",
    },
    sizeLarge: {
      padding: "12px 24px",
      fontSize: "16px",
    },
  },

  variants: [
    {
      props: { variant: "contained", color: "Green100", size: "large" },
      style: {
        backgroundColor: colors.Green100,
        color: "white",
        padding: "16px 24px",
        fontSize: "24px",

        "&.Mui-disabled": {
          backgroundColor: colors.Neutral600,
          color: colors.Neutral400,
        },
      },
    },
    {
      props: { variant: "contained", color: "Green200", size: "large" },
      style: {
        backgroundColor: colors.Green200,
        color: "white",
        fontSize: "20px",
        fontWeight: 600,
        "& > svg": { fontSize: "64px", marginRight: "16px" },
        padding: "16px 24px",
        minHeight: "72px",

        "&.Mui-disabled": {
          backgroundColor: colors.Neutral600,
          color: colors.Neutral400,
          "& > svg": { color: colors.Neutral400 },

          "& .MuiLoadingButton-loadingIndicator": {
            "& .MuiCircularProgress-root": {
              width: "32px !important",
              height: "32px !important",
            },
          },
        },
      },
    },
  ],
};
