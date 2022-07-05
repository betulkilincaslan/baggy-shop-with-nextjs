import Head from "next/head";
import { Container, Box } from "@mui/material";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { grey } from "@mui/material/colors";

export default function Layout({ children, title, description }) {
  return (
    <>
      <Head>
        {description && <meta name="description" content={description}></meta>}
        <title> {title ? `${title} | Baggy Shop ` : "Baggy Shop"} </title>
      </Head>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        color={grey[800]}
      >
        <Navbar />
        <Container
          component="main"
          maxWidth="xl"
          sx={{ pt: "40px", pb: "100px" }}
        >
          {children}
        </Container>
        <Footer />
      </Box>
    </>
  );
}
