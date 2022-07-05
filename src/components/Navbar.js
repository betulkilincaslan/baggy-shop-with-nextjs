import React, { useContext, useState } from "react";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { Store } from "context/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { grey } from "@mui/material/colors";
import dynamic from "next/dynamic";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import ShopIcon from "@mui/icons-material/Shop";

function Navbar() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
    userInfo,
  } = state;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const loginHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeLoginMenuHandler = () => {
    setAnchorEl(null);
  };

  const goUserProfileHandler = () => {
    setAnchorEl(null);
    router.push("/profile");
  };

  const logoutHandler = () => {
    setAnchorEl(null);
    dispatch({ type: "LOGOUT_USER" });
    Cookies.remove("userInfo");
    Cookies.remove("cartItems");
    router.push("/");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="false">
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pt: "8px",
            pb: "8px",
          }}
        >
          <Box>
            <Typography color={grey[50]} variant="h4">
              Free ship on order over $200
            </Typography>
          </Box>
          <Box>
            <Typography
              color={grey[50]}
              variant="h4"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <PhoneOutlinedIcon sx={{ fontSize: "18px" }} />
              &nbsp; +0.2222.8888
            </Typography>
          </Box>
        </Container>
        <Divider color={grey[600]} />
      </Container>
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <NextLink href="/products" passHref>
              <Typography
                component="a"
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                }}
                color={grey[50]}
              >
                Shop
                <ShopIcon sx={{ ml: "1px" }} />
              </Typography>
            </NextLink>
          </Box>
          <Box>
            <NextLink href="/" passHref>
              <Typography
                variant="h1"
                component="h1"
                noWrap
                sx={{ cursor: "pointer", fontWeight: "bold" }}
                color={grey[50]}
              >
                Baggy Shop
              </Typography>
            </NextLink>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1.2rem",
              fontWeight: "bold",
            }}
          >
            <NextLink href="/cart" passHref>
              <Typography
                component="a"
                sx={{
                  fontWeight: "bold",
                }}
                color={grey[50]}
              >
                {cartItems.length > 0 ? (
                  <Badge
                    // color="secondary"
                    max={20}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    badgeContent={cartItems.reduce(
                      (acc, cur) => acc + cur.quantity,
                      0
                    )}
                  >
                    <ShoppingBagOutlinedIcon />
                  </Badge>
                ) : (
                  <ShoppingBagOutlinedIcon />
                )}
              </Typography>
            </NextLink>
            {userInfo ? (
              <>
                <Button
                  sx={{
                    color: "#fff",
                    textTransform: "initial",
                    fontWeight: "bold",
                  }}
                  color="primary"
                  id="login-button"
                  aria-controls={open ? "login-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={loginHandler}
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <AccountCircleRoundedIcon />
                    &nbsp;
                    {userInfo.name}
                  </Typography>
                </Button>
                <Menu
                  id="login-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={closeLoginMenuHandler}
                  MenuListProps={{
                    "aria-labelledby": "login-button",
                  }}
                >
                  <MenuItem onClick={goUserProfileHandler}>Profile</MenuItem>
                  <MenuItem onClick={closeLoginMenuHandler}>
                    My account
                  </MenuItem>
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <NextLink href="/login" passHref>
                <Typography
                  component="a"
                  sx={{
                    fontWeight: "bold",
                  }}
                  color={grey[50]}
                >
                  <AccountCircleRoundedIcon />
                </Typography>
              </NextLink>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
