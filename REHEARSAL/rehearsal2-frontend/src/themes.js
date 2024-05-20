// themes.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0084FF", // Messenger primary blue
    },
    secondary: {
      main: "#FFC300", // accents
    },
    background: {
      default: "#EDEFF2", // light gray backg
      paper: "#F7F7F8", // components like cards, dialogs
    },
    text: {
      primary: "#000000", // black text
      secondary: "#545454", // gray text
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    button: {
      textTransform: "none", // bttons in Messenger don't have uppercase text
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: "15px",
        },
      },
    },
  },
});

export default theme;
