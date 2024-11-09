import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#D0C8FF", 
    },
    secondary: {
      main: "#FFBB7B", 
    },
    text: {
      primary: "#D0C8FF", 
      secondary: "#FFBB7B", 
    },
    background: {
      default: "#121212", 
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Arial", sans-serif', 
    body1: {
      color: "#D0C8FF",
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6C60FF",
    },
    secondary: {
      main: "#DF7028",
    },
    text: {
      primary: "#191353",
      secondary: "#333333",
    },
    background: {
      default: "#F6DFD3",
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Arial", sans-serif',
    body1: {
      color: "#191353",
    },
  },
});
