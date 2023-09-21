import "@emotion/react";
import { theme } from "@/styles/theme";

type CustomThemeType = typeof theme;

declare module "@emotion/react" {
  interface Theme extends CustomThemeType {}
}
