import { Breadcrumbs, Link } from "@mui/material";
import React from "react";
import { grey } from "@mui/material/colors";

export default function Breadcrumb() {
  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs
        sx={{ mb: "20px" }}
        color={grey[800]}
        aria-label="breadcrumb"
      >
        <Link underline="hover" color="inherit" href="/">
          MUI
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Core
        </Link>
        <Link
          sx={{ fontWeight: "bold" }}
          underline="hover"
          // color="text.primary"
          href="/material-ui/react-breadcrumbs/"
          aria-current="page"
        >
          Breadcrumbs
        </Link>
      </Breadcrumbs>
    </div>
  );
}
