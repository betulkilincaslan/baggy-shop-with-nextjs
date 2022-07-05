import React, { useContext } from "react";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Link,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Layout from "components/Layout";
import { Store } from "context/Store";
import axios from "axios";
import { useSnackbar } from "notistack";
import { grey } from "@mui/material/colors";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

function Cart() {
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const updateCartItemHandler = async (item, method) => {
    const { data } = await axios.get(`/api/products/${item._id}`);

    if (method === "plus" && data.countInStock > item.quantity) {
      let quantity = item.quantity + 1;
      dispatch({ type: "ADD_TO_CART", payload: { ...item, quantity } });
    }
    if (method === "minus" && item.quantity > 1) {
      let quantity = item.quantity - 1;
      dispatch({ type: "ADD_TO_CART", payload: { ...item, quantity } });
    }
  };

  const removeItemFromCartHandler = (item) => {
    closeSnackbar();
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
    enqueueSnackbar(`${item.name} removed from cart!`, { variant: "info" });
  };
  const checkoutHandler = () => {
    router.push("/shipping");
  };

  const calcItemTotalPrice = (item) => {
    return item.price * item.quantity;
  };

  const calcSubTotal = () => {
    return cartItems
      .reduce((acc, cur) => acc + cur.quantity * cur.price, 0)
      .toFixed(2);
  };

  const calcTotalCartItemQuantity = () => {
    return cartItems.reduce((acc, cur) => acc + cur.quantity, 0);
  };

  return (
    <Layout title="Shopping Cart">
      <Container maxWidth="xl">
        <Typography
          component="h1"
          variant="h6"
          color="primary.dark"
          sx={{ mb: "20px" }}
        >
          Shopping Cart
        </Typography>
        {cartItems.length === 0 ? (
          <div>
            Cart is empty.{" "}
            <NextLink href="/products" passHref>
              <Link>Go shopping</Link>
            </NextLink>
          </div>
        ) : (
          <Grid container spacing={2}>
            <Grid item md={8} lg={9} xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{ color: `${grey[800]}`, fontWeight: "bold" }}
                      >
                        Image
                      </TableCell>
                      <TableCell
                        sx={{ color: `${grey[800]}`, fontWeight: "bold" }}
                      >
                        Product
                      </TableCell>
                      <TableCell
                        sx={{ color: `${grey[800]}`, fontWeight: "bold" }}
                        align="right"
                      >
                        Price
                      </TableCell>

                      <TableCell
                        sx={{ color: `${grey[800]}`, fontWeight: "bold" }}
                        align="right"
                      >
                        Quantity
                      </TableCell>

                      <TableCell
                        sx={{ color: `${grey[800]}`, fontWeight: "bold" }}
                        align="right"
                      >
                        Total
                      </TableCell>

                      <TableCell
                        sx={{
                          color: `${grey[800]}`,
                          fontWeight: "bold",
                          pr: "20px",
                        }}
                        align="right"
                      >
                        Remove
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>
                          <NextLink href={`/products/${item.slug}`} passHref>
                            <Link>
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={100}
                                height={100}
                              ></Image>
                            </Link>
                          </NextLink>
                        </TableCell>

                        <TableCell>
                          <NextLink href={`/products/${item.slug}`} passHref>
                            <Typography component="a" color={grey[800]}>
                              {item.name}
                            </Typography>
                          </NextLink>
                        </TableCell>

                        <TableCell align="right">
                          <Typography component="span" color={grey[800]}>
                            ${item.price}
                          </Typography>
                        </TableCell>

                        <TableCell align="right">
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              ml: "auto",
                              border: `1px solid ${grey[300]}`,
                              width: "90px",
                              p: "5px",
                            }}
                          >
                            <Button
                              sx={{
                                minWidth: "0",
                                width: "25px",
                                height: "25px",
                                color: `${grey[800]}`,
                              }}
                              onClick={() => {
                                updateCartItemHandler(item, "minus");
                              }}
                            >
                              <RemoveIcon />
                            </Button>
                            <Typography sx={{ m: "0 10px" }}>
                              {item.quantity}
                            </Typography>
                            <Button
                              sx={{
                                minWidth: "0",
                                width: "25px",
                                height: "25px",
                                color: `${grey[800]}`,
                              }}
                              onClick={() => {
                                updateCartItemHandler(item, "plus");
                              }}
                            >
                              <AddIcon />
                            </Button>
                          </Box>
                        </TableCell>

                        <TableCell align="right">
                          <Typography component="span" color={grey[800]}>
                            ${calcItemTotalPrice(item)}
                          </Typography>
                        </TableCell>

                        <TableCell align="right">
                          <Button
                            sx={{ p: "4px", minWidth: "0", mr: "5px" }}
                            variant="contained"
                            color="secondary"
                            onClick={() => removeItemFromCartHandler(item)}
                          >
                            <ClearIcon sx={{ color: `${grey[100]}` }} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item md={4} lg={3} xs={12}>
              <Card>
                <List>
                  {cartItems.map((item) => (
                    <ListItem key={item._id}>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography color={grey[800]}>
                            {item.name} x {item.quantity}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography color={grey[800]} align="right">
                            ${calcItemTotalPrice(item)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                  ))}
                  <ListItem>
                    <Grid container>
                      <Grid item xs={9}>
                        <Typography
                          color={grey[800]}
                          sx={{
                            fontWeight: "bold",
                            textTransform: "uppercase",
                          }}
                        >
                          Subtotal ({calcTotalCartItemQuantity()}{" "}
                          {calcTotalCartItemQuantity() > 1 ? "items" : "item"} )
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          color={grey[800]}
                          sx={{ fontWeight: "bold" }}
                          align="right"
                        >
                          ${calcSubTotal()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Button
                      onClick={checkoutHandler}
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ color: `${grey[100]}`, fontWeight: "bold" }}
                    >
                      Checkout
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
