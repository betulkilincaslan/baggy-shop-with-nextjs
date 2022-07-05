import { Container, Typography } from "@mui/material";
import Layout from "components/Layout";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { green } from "@mui/material/colors";

export default function PaymentSuccessPage() {
  return (
    <Layout title="Payment Success">
      <Container maxWidth="md" sx={{ textAlign: "center", mt: "3rem" }}>
        <Typography
          variant="h1"
          color="primary.dark"
          sx={{ fontWeight: "bold", mb: "2rem" }}
        >
          Congratulations.
        </Typography>
        <Typography
          color="primary.dark"
          sx={{ fontWeight: "bold", mb: "2rem" }}
        >
          Payment has been made successfully.
        </Typography>
        <CheckCircleIcon sx={{ color: `${green[800]}`, fontSize: "2rem" }} />
      </Container>
    </Layout>
  );
}
