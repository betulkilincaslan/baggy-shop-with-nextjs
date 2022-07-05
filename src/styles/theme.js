import { createTheme } from "@mui/material/styles";
import { grey, yellow } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: grey[800],
    },
    secondary: {
      light: yellow[60],
      main: yellow[700],
    },
  },
  typography: {
    h1: {
      fontSize: "1.5rem",
    },
    h2: {
      fontSize: "1.25rem",
    },
    h3: {
      fontSize: "1rem",
    },
    h4: {
      fontSize: "14px",
      lineHeight: "1.5",
    },
    h5: {
      fontSize: "13px",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});
