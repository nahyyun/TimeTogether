const gray = {
  50: "#f2f4f6",
  100: "#e5e8eb",
  200: "#d1d6db",
  300: "#8b95a1",
  400: "#4e5968",
  500: "#191f28",
} as const;

export const theme = {
  colors: {
    primary: {
      50: "#C2E7E8",
      100: "#9AD7D9",
      200: "#5EC0C3",
      300: "#21A8AC",
    },
    black: "#000",
    white: "#FFF",
    gray,
    text: {
      primary: gray[500],
      secondary: gray[400],
      white: "#FFF",
      muted: gray[300],
    },
    success: "#D9F1DA",
    error: "#FF7C7C",
  },
  size: {
    text: {
      xs: "10px",
      sm: "13px",
      md: "18px",
      lg: "20px",
      xlg: "30px",
      xxlg: "44px",
    },
  },
} as const;
