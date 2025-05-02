import { Components, Theme } from "@mui/material/styles";
import { ButtonOverride, ContainerOverride } from "./overrides";

export const customComponents: Components<Theme> = {
  MuiContainer: ContainerOverride,
  MuiButton: ButtonOverride,
};
