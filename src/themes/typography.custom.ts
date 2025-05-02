import { TypographyOptions } from "@mui/material/styles/createTypography";
import { CSSProperties } from "react";

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    Heading1: true;
    Heading2: true;
    Heading3: true;
    Heading4: true;

    Subheading1: true;
    Subheading1Bold: true;
    Subheading2: true;
    Subheading2Bold: true;

    Body1: true;
    Body1Bold: true;
    Body2: true;
    Body2Bold: true;
    Body3: true;
    Body3Bold: true;

    Caption1: true;
    Caption1Bold: true;
    Caption2: true;
    Caption2Bold: true;
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    Heading1: CSSProperties;
    Heading2: CSSProperties;
    Heading3: CSSProperties;
    Heading4: CSSProperties;

    Subheading1: CSSProperties;
    Subheading1Bold: CSSProperties;
    Subheading2: CSSProperties;
    Subheading2Bold: CSSProperties;

    Body1: CSSProperties;
    Body1Bold: CSSProperties;
    Body2: CSSProperties;
    Body2Bold: CSSProperties;
    Body3: CSSProperties;
    Body3Bold: CSSProperties;

    Caption1: CSSProperties;
    Caption1Bold: CSSProperties;
    Caption2: CSSProperties;
    Caption2Bold: CSSProperties;
  }

  interface TypographyVariantsOptions {
    Heading1: CSSProperties;
    Heading2: CSSProperties;
    Heading3: CSSProperties;
    Heading4: CSSProperties;

    Subheading1: CSSProperties;
    Subheading1Bold: CSSProperties;
    Subheading2: CSSProperties;
    Subheading2Bold: CSSProperties;

    Body1: CSSProperties;
    Body1Bold: CSSProperties;
    Body2: CSSProperties;
    Body2Bold: CSSProperties;
    Body3: CSSProperties;
    Body3Bold: CSSProperties;

    Caption1: CSSProperties;
    Caption1Bold: CSSProperties;
    Caption2: CSSProperties;
    Caption2Bold: CSSProperties;
  }
}

export const customTypography: TypographyOptions = {
  fontFamily: "Inter, sans-serif",

  Heading1: { fontSize: "48px", fontWeight: "bold" },
  Heading2: { fontSize: "42px", fontWeight: "bold" },
  Heading3: { fontSize: "36px", fontWeight: "bold" },
  Heading4: { fontSize: "32px", fontWeight: "bold" },

  Subheading1: { fontSize: "28px" },
  Subheading1Bold: { fontSize: "28px", fontWeight: "bold" },
  Subheading2: { fontSize: "24px" },
  Subheading2Bold: { fontSize: "24px", fontWeight: "bold" },

  Body1: { fontSize: "20px" },
  Body1Bold: { fontSize: "20px", fontWeight: "bold" },
  Body2: { fontSize: "18px" },
  Body2Bold: { fontSize: "18px", fontWeight: "bold" },
  Body3: { fontSize: "16px" },
  Body3Bold: { fontSize: "16px", fontWeight: "bold" },

  Caption1: { fontSize: "14px" },
  Caption1Bold: { fontSize: "14px", fontWeight: "bold" },
  Caption2: { fontSize: "12px" },
  Caption2Bold: { fontSize: "12px", fontWeight: "bold" },
};
