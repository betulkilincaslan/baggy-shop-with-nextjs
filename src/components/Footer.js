import { grey } from "@mui/material/colors";
import {
  Box,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";

export default function Footer() {
  const footerBg = grey[300];
  return (
    <Box
      component="footer"
      sx={{ backgroundColor: footerBg, mt: "auto", pt: "30px", pb: "20px" }}
    >
      <Container maxWidth="lg" sx={{ mb: "50px" }}>
        <Grid container spacing={3}>
          <Grid item md={4} xs={12}>
            <List>
              <ListItem>
                <Typography
                  color={grey[800]}
                  sx={{ textTransform: "uppercase", fontWeight: "bold" }}
                >
                  Information
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="h4">About Us</Typography>
              </ListItem>
              <ListItem>
                <Typography variant="h4">Privacy Policy</Typography>
              </ListItem>
              <ListItem>
                <Typography variant="h4">Terms & Conditions</Typography>
              </ListItem>
              <ListItem>
                <Typography variant="h4">Contact Us</Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid item md={4} xs={12}>
            <List>
              <ListItem>
                <Typography
                  color={grey[800]}
                  sx={{ textTransform: "uppercase", fontWeight: "bold" }}
                >
                  About Us
                </Typography>
              </ListItem>
              <ListItem
                sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
              >
                <Typography variant="h4">
                  Lorem ipsum dolor sit amet, meis disputationi in est. Semper
                  vivendum imperdiet in eam, no labore mediocritatem nec.
                </Typography>
                <Typography variant="h4">
                  Odio delenit perfecto eos id. Minim assueverit an est, cu duo
                  suas dicit. His in scripta vituperata. Errem libris albucius
                  quo ut, pro erat tibique perfecto ex. Et per ceteros
                  sententiae. At usu primis apeirian probatus.
                </Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid item md={4} xs={12}>
            <List>
              <ListItem>
                <Typography
                  color={grey[800]}
                  sx={{ textTransform: "uppercase", fontWeight: "bold" }}
                >
                  Contact Us
                </Typography>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={2}>
                    <LocationOnOutlinedIcon />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="h4">
                      Example Street, Example, EX 123
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={2}>
                    <PhoneOutlinedIcon />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="h4">+0.2222.8888</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={2}>
                    <MailOutlinedIcon />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="h4">contact@example.com</Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Container>
      <Divider />
      <Container maxWidth="lg" sx={{ pt: "20px", textAlign: "center" }}>
        <Typography variant="h5">
          © Copyright 2022 &nbsp;
          <Typography
            component="span"
            variant="h5"
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            Baggy Shop. &nbsp;
          </Typography>
          <Typography component="span" variant="h5">
            All rights reserved.
          </Typography>
        </Typography>
      </Container>
    </Box>
  );
}
