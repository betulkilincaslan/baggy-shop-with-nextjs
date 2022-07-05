import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Layout from "components/Layout";
import { Store } from "context/Store";
import NextLink from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import CheckoutStep from "components/CheckoutStep";
import { useSnackbar } from "notistack";
import { getError } from "/utils/error";
import { loadStripe } from "@stripe/stripe-js";
import Cookies from "js-cookie";
import {
  Button,
  Card,
  CircularProgress,
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

function PlaceOrderPage() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { cartItems, shippingAddress, paymentMethod },
  } = state;
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
    if (cartItems.length === 0) {
      router.push("/cart");
    }
  }, []);
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const redirectToCheckoutHandler = async () => {
    closeSnackbar();
    try {
      setLoading(true);
      const { data } = await axios.post("api/checkout_sessions", {
        items: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      dispatch({ type: "CLEAR_CART" });
      Cookies.remove("cartItems");
      // redirect to checkout
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      );
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  return (
    <Layout title="Place Order">
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <CheckoutStep activeStep={3}></CheckoutStep>
      </Container>
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <Typography component="h1" variant="h1">
          Place Order
        </Typography>

        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <Card sx={{ mt: "10px", mb: "10px" }}>
              <List>
                <ListItem>
                  <Typography component="h2" variant="h2">
                    Shipping Address
                  </Typography>
                </ListItem>
                <ListItem>
                  {shippingAddress.address}, {shippingAddress.city},{" "}
                  {shippingAddress.postalCode}, {shippingAddress.country}
                </ListItem>
              </List>
            </Card>
            <Card sx={{ mt: "10px", mb: "10px" }}>
              <List>
                <ListItem>
                  <Typography component="h2" variant="h2">
                    Payment Method
                  </Typography>
                </ListItem>
                <ListItem>{paymentMethod}</ListItem>
              </List>
            </Card>
            <Card sx={{ mt: "10px", mb: "10px" }}>
              <List>
                <ListItem>
                  <Typography component="h2" variant="h2">
                    Order Items
                  </Typography>
                </ListItem>
                <ListItem>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Image</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell align="right">Quantity</TableCell>
                          <TableCell align="right">Price</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cartItems.map((item) => (
                          <TableRow key={item._id}>
                            <TableCell>
                              <NextLink href={`/product/${item.slug}`} passHref>
                                <Link>
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={50}
                                    height={50}
                                  ></Image>
                                </Link>
                              </NextLink>
                            </TableCell>

                            <TableCell>
                              <NextLink href={`/product/${item.slug}`} passHref>
                                <Link>
                                  <Typography>{item.name}</Typography>
                                </Link>
                              </NextLink>
                            </TableCell>
                            <TableCell align="right">
                              <Typography>{item.quantity}</Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography>${item.price}</Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </ListItem>
              </List>
            </Card>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card sx={{ mt: "10px", mb: "10px" }}>
              <List>
                <ListItem>
                  <Typography variant="h2">Order Summary</Typography>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Items:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">${itemsPrice}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>
                        <strong>Total:</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        <strong>${totalPrice}</strong>
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Button
                    onClick={redirectToCheckoutHandler}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Checkout
                  </Button>
                </ListItem>
                {loading && (
                  <ListItem>
                    <CircularProgress />
                  </ListItem>
                )}
              </List>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
export default dynamic(() => Promise.resolve(PlaceOrderPage), { ssr: false });
