import "styles/globals.css";
import { StoreProvider } from "context/Store";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default MyApp;
