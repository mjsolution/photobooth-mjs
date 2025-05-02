import { createTheme, PaletteOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    Yellow: Palette["primary"];
    Blue: Palette["primary"];
    Red: Palette["primary"];
    Green: Palette["primary"];
    Green100: Palette["primary"];
    Green200: Palette["primary"];
    Green300: Palette["primary"];
    Green400: Palette["primary"];
    BackgroundPrimary: Palette["primary"];
    BackgroundSecondary: Palette["primary"];
    Neutral100: Palette["primary"];
    Neutral200: Palette["primary"];
    Neutral300: Palette["primary"];
    Neutral400: Palette["primary"];
    Neutral500: Palette["primary"];
    Neutral600: Palette["primary"];
    Neutral700: Palette["primary"];
    Neutral800: Palette["primary"];
    Neutral900: Palette["primary"];
  }

  interface PaletteOptions {
    Yellow: PaletteOptions["primary"];
    Blue: PaletteOptions["primary"];
    Red: PaletteOptions["primary"];
    Green: PaletteOptions["primary"];
    Green100: PaletteOptions["primary"];
    Green200: PaletteOptions["primary"];
    Green300: PaletteOptions["primary"];
    Green400: PaletteOptions["primary"];
    BackgroundPrimary: PaletteOptions["primary"];
    BackgroundSecondary: PaletteOptions["primary"];
    Neutral100: PaletteOptions["primary"];
    Neutral200: PaletteOptions["primary"];
    Neutral300: PaletteOptions["primary"];
    Neutral400: PaletteOptions["primary"];
    Neutral500: PaletteOptions["primary"];
    Neutral600: PaletteOptions["primary"];
    Neutral700: PaletteOptions["primary"];
    Neutral800: PaletteOptions["primary"];
    Neutral900: PaletteOptions["primary"];
  }
}

const theme = createTheme();

export const colors = {
  Yellow: "#FFD35A",
  Blue: "#009FBD",
  Red: "#EF5A6F",
  Green: "#7ABA78",
  Green100: "#17242B",
  Green200: "#9219CE",
  Green300: "#3AAFA9",
  Green400: "#E0F2F0",
  BackgroundPrimary: "#FAF9F6",
  BackgroundSecondary: "#D9D9D9",
  Neutral100: "#171717",
  Neutral200: "#262626",
  Neutral300: "#434343",
  Neutral400: "#8C8C8C",
  Neutral500: "#BFBFBF",
  Neutral600: "#D9D9D9",
  Neutral700: "#F0F0F0",
  Neutral800: "#FAFAFA",
  Neutral900: "#FFFFFF",
};

export const customPalette: PaletteOptions = {
  Yellow: {
    main: colors.Yellow,
    contrastText: theme.palette.getContrastText(colors.Yellow),
  },
  Blue: {
    main: colors.Blue,
    contrastText: theme.palette.getContrastText(colors.Blue),
  },
  Red: {
    main: colors.Red,
    contrastText: theme.palette.getContrastText(colors.Red),
  },
  Green: {
    main: colors.Green,
    contrastText: theme.palette.getContrastText(colors.Green),
  },
  Green100: {
    main: colors.Green100,
    contrastText: theme.palette.getContrastText(colors.Green100),
  },
  Green200: {
    main: colors.Green200,
    contrastText: theme.palette.getContrastText(colors.Green200),
  },
  Green300: {
    main: colors.Green300,
    contrastText: theme.palette.getContrastText(colors.Green300),
  },
  Green400: {
    main: colors.Green400,
    contrastText: theme.palette.getContrastText(colors.Green400),
  },
  BackgroundPrimary: {
    main: colors.BackgroundPrimary,
    contrastText: theme.palette.getContrastText(colors.BackgroundPrimary),
  },
  BackgroundSecondary: {
    main: colors.BackgroundSecondary,
    contrastText: theme.palette.getContrastText(colors.BackgroundSecondary),
  },
  Neutral100: {
    main: colors.Neutral100,
    contrastText: theme.palette.getContrastText(colors.Neutral100),
  },
  Neutral200: {
    main: colors.Neutral200,
    contrastText: theme.palette.getContrastText(colors.Neutral200),
  },
  Neutral300: {
    main: colors.Neutral300,
    contrastText: theme.palette.getContrastText(colors.Neutral300),
  },
  Neutral400: {
    main: colors.Neutral400,
    contrastText: theme.palette.getContrastText(colors.Neutral400),
  },
  Neutral500: {
    main: colors.Neutral500,
    contrastText: theme.palette.getContrastText(colors.Neutral500),
  },
  Neutral600: {
    main: colors.Neutral600,
    contrastText: theme.palette.getContrastText(colors.Neutral600),
  },
  Neutral700: {
    main: colors.Neutral700,
    contrastText: theme.palette.getContrastText(colors.Neutral700),
  },
  Neutral800: {
    main: colors.Neutral800,
    contrastText: theme.palette.getContrastText(colors.Neutral800),
  },
  Neutral900: {
    main: colors.Neutral900,
    contrastText: theme.palette.getContrastText(colors.Neutral900),
  },
};
