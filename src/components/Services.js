import { Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import DesktopMacOutlinedIcon from "@mui/icons-material/DesktopMacOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import KeyboardReturnOutlinedIcon from "@mui/icons-material/KeyboardReturnOutlined";

export default function Services() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={4} xs={12} sx={{ borderRight: "1px solid black" }}>
          <Typography
            variant="h2"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <DesktopMacOutlinedIcon sx={{ fontSize: "40px", mr: "15px" }} />
            Online Shopping
          </Typography>
        </Grid>
        <Grid item md={4} xs={12}>
          <Typography
            variant="h2"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <LocalShippingOutlinedIcon sx={{ fontSize: "40px", mr: "15px" }} />
            Free ship on order over $200
          </Typography>
        </Grid>
        <Grid item md={4} xs={12}>
          <Typography
            variant="h2"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <KeyboardReturnOutlinedIcon sx={{ fontSize: "40px", mr: "15px" }} />
            Easy Exchange / Return
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
