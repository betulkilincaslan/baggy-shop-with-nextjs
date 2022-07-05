import { Box, Typography } from "@mui/material";

export default function About() {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography
        variant="h1"
        sx={{ marginBottom: "20px", fontWeight: "bold" }}
      >
        About Us
      </Typography>
      <Typography component="p">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Typography>
    </Box>
  );
}
