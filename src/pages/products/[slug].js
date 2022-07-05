import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  List,
  ListItem,
  Rating,
  styled,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import Layout from "components/Layout";
import NextLink from "next/link";
import db from "/utils/db";
import Product from "/models/productModel";
import Image from "next/image";
import { Store } from "context/Store";
import axios from "axios";
import { grey } from "@mui/material/colors";
import { useSnackbar } from "notistack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ProductDetailTabs from "components/ProductDetailTabs";
import Breadcrumb from "components/Breadcrumb";

export default function ProductDetail({ product }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [itemQuantity, setItemQuantity] = useState(1);

  if (!product) {
    return <div>Product Not Found!</div>;
  }

  const addToCartHandler = async () => {
    closeSnackbar();
    const existItem = cart.cartItems.find((item) => item._id === product._id);
    const quantity = existItem
      ? existItem.quantity + itemQuantity
      : itemQuantity;

    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });
    enqueueSnackbar(`${product.name} added to cart!`, { variant: "info" });
  };

  const decreaseItemQuantityHandler = () => {
    if (itemQuantity > 1) {
      setItemQuantity(itemQuantity - 1);
    }
  };

  const increaseItemQuantityHandler = () => {
    if (itemQuantity < 10) {
      setItemQuantity(itemQuantity + 1);
    }
  };

  const StyledRating = styled(Rating)({});

  return (
    <Layout title={product.name} description={product.description}>
      <Container maxWidth="xl" sx={{ mb: "40px" }}>
        <Breadcrumb />
        <Typography component="div" sx={{ mb: "10px" }}>
          <NextLink href="/products" passHref>
            <Link sx={{ cursor: "pointer" }}>Back to products</Link>
          </NextLink>
        </Typography>

        <Grid container spacing={2}>
          <Grid item md={7} xs={12}>
            <Container maxWidth="sm">
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                layout="responsive"
              ></Image>
            </Container>
          </Grid>

          <Grid item md={5} xs={12}>
            <List>
              <ListItem sx={{ mb: "15px" }}>
                <Typography
                  component="h1"
                  variant="h1"
                  color="primary.dark"
                  sx={{ fontWeight: "bold" }}
                >
                  {product.name}
                </Typography>
              </ListItem>

              <ListItem>
                <StyledRating
                  sx={{ color: "primary.dark" }}
                  readOnly
                  name="like-review"
                  value={product.rating}
                  precision={0.5}
                  icon={<FavoriteIcon fontSize="inherit" />}
                  emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                />

                <Typography
                  sx={{ marginLeft: "8px", fontSize: "14px" }}
                  color={grey[700]}
                >
                  {product.numReviews} reviews
                </Typography>
              </ListItem>

              <ListItem sx={{ mb: "40px" }}>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography
                      variant="h2"
                      sx={{ fontWeight: "bold" }}
                      color={grey[800]}
                    >
                      ${product.price}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      color={
                        product.countInStock > 0
                          ? "primary.dark"
                          : "secondary.dark"
                      }
                      sx={{ fontWeight: "bold" }}
                      align="right"
                    >
                      {product.countInStock > 0 ? "In stock" : "Unavailable"}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem sx={{ mb: "20px" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Button
                    variant="contained"
                    sx={{
                      minWidth: "0",
                      width: "25px",
                      height: "25px",
                      color: `${grey[100]}`,
                    }}
                    onClick={decreaseItemQuantityHandler}
                  >
                    <RemoveIcon />
                  </Button>
                  <Typography sx={{ m: "0 15px" }}>{itemQuantity}</Typography>
                  <Button
                    variant="contained"
                    sx={{
                      minWidth: "0",
                      width: "25px",
                      height: "25px",
                      color: `${grey[100]}`,
                    }}
                    onClick={increaseItemQuantityHandler}
                  >
                    <AddIcon />
                  </Button>
                </Box>
              </ListItem>
              <ListItem sx={{ mb: "40px" }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={addToCartHandler}
                  size="large"
                  sx={{ color: `${grey[100]}`, fontWeight: "bold" }}
                >
                  Add to cart
                </Button>
              </ListItem>
              <hr />
              <ListItem sx={{ minHeight: "150px" }}>
                <Typography
                  variant="h3"
                  sx={{ lineHeight: "1.5" }}
                  color={grey[800]}
                >
                  {product.description}
                </Typography>
              </ListItem>
              <hr />
            </List>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="xl">
        <ProductDetailTabs />
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connectDB();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnectDB();

  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}
