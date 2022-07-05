import React, { useContext, useState } from "react";
import { Store } from "context/Store";
import Layout from "components/Layout";
import db from "/utils/db";
import Product from "/models/productModel";
import ProductBox from "components/ProductBox";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import GridOnRoundedIcon from "@mui/icons-material/GridOnRounded";
import { grey } from "@mui/material/colors";
import axios from "axios";
import { useSnackbar } from "notistack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Products({ products, categories }) {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
    filteredCategory,
  } = state;
  const [panelExpanded, setPanelExpanded] = useState(true);

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handlePanelChange = () => {
    setPanelExpanded(!panelExpanded);
  };
  const removeHyphenFromCategories = categories.map((item) =>
    item.replace("-", " ")
  );

  const capitalizedCategories = removeHyphenFromCategories.map((item) => {
    const words = item.split(" ");
    const newWord = words
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join(" ");
    return newWord;
  });

  const filterByCategory = async (e) => {
    let categoryName = e.target.value.toLowerCase().replaceAll(" ", "-");
    if (e.target.checked) {
      dispatch({ type: "ADD_FILTERED_CATEGORY", payload: categoryName });
    }
    if (!e.target.checked) {
      dispatch({ type: "REMOVE_FILTERED_CATEGORY", payload: categoryName });
    }
  };

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [colSize, setColSize] = useState(Number(6));

  const clickColSizeHandler = (colSize) => {
    setColSize(Number(colSize));
  };

  const addToCartHandler = async (product) => {
    closeSnackbar();
    const existItem = cartItems.find((item) => item._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });

    enqueueSnackbar(`${product.name} added to cart!`, { variant: "info" });
  };

  return (
    <Layout title="Shop" description="Baggy Shop products.">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item md={3} xs={12}>
            <div>
              <Accordion expanded={panelExpanded} onChange={handlePanelChange}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="categoryFilter-content"
                  id="categoryFilter-header"
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                    color="primary.dark"
                  >
                    Categories
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    {capitalizedCategories.map((c) => (
                      <FormControlLabel
                        key={c}
                        control={
                          <Checkbox
                            onClick={(e) => {
                              filterByCategory(e);
                            }}
                          />
                        }
                        label={c}
                        value={c}
                        sx={{ color: `${grey[800]}` }}
                      />
                    ))}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
            </div>
          </Grid>
          <Grid item md={9} xs={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: "20px",
              }}
            >
              <Box>
                <FormControl size="small" sx={{ minWidth: "110px" }}>
                  <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={30}>Best Sellers</MenuItem>
                    <MenuItem value={10}>Price: High-Low</MenuItem>
                    <MenuItem value={20}>Price: Low-High</MenuItem>
                    <MenuItem value={30}>Newest</MenuItem>
                    <MenuItem value={30}>Top rATED</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box color={grey[600]}>
                <GridOnRoundedIcon
                  sx={{ mr: "10px", cursor: "pointer" }}
                  onClick={() => clickColSizeHandler(Number(4))}
                />
                <GridViewRoundedIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => clickColSizeHandler(Number(6))}
                />
              </Box>
            </Box>
            <Grid container spacing={3}>
              {filteredCategory.length === 0
                ? products.map((product) => (
                    <Grid item md={colSize} key={product.name}>
                      <ProductBox
                        product={product}
                        addToCartHandler={addToCartHandler}
                      />
                    </Grid>
                  ))
                : products.map((prod) =>
                    filteredCategory.map(
                      (cat) =>
                        cat === prod.category && (
                          <Grid item md={`${colSize}`} key={prod.name}>
                            <ProductBox
                              product={prod}
                              addToCartHandler={addToCartHandler}
                            />
                          </Grid>
                        )
                    )
                  )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Container
        maxWidth="sm"
        sx={{ display: "flex", justifyContent: "center", mt: "60px" }}
      >
        <Pagination count={10} color="primary" />
      </Container>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connectDB();
  const products = await Product.find({}).lean().sort({ price: 1 });
  const categories = await Product.find().distinct("category");

  await db.disconnectDB();

  return {
    props: {
      products: products.map(db.convertDocToObj),
      categories,
    },
  };
}
