import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";

export default function CallToAction() {
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center" }}>
      <Typography
        variant="h1"
        sx={{ marginBottom: "20px", fontWeight: "bold" }}
      >
        Keep In Touch
      </Typography>
      <Typography variant="h4" sx={{ mb: "25px" }}>
        Get the latest updates on new products and upcoming sales
      </Typography>
      <Box>
        <Grid container>
          <Grid item xs={10}>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email"
              inputProps={{ type: "email" }}
            ></TextField>
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{ bgcolor: `${grey[800]}`, height: "100%" }}
            >
              Subscribe
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
