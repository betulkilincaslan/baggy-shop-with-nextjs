import React from "react";
import Layout from "components/Layout";
import Carousel from "react-material-ui-carousel";
import NextLink from "next/link";
import {
  Box,
  CardMedia,
  Container,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import About from "components/About";
import HomeImageList from "components/HomeImageList";
import CallToAction from "components/CallToAction";
import Services from "components/Services";

export default function Home() {
  const bannerItems = [
    {
      name: "Banner 1",
      image: "/images/home-banner-1.png",
    },
    {
      name: "Banner 2",
      image: "/images/home-banner-2.png",
    },
    {
      name: "Banner 3",
      image: "/images/home-banner-3.png",
    },
  ];
  return (
    <Layout>
      <Container maxWidth="xl" sx={{ textAlign: "center" }}>
        <Grid container sx={{ mb: "50px" }}>
          <Grid item xs={12}>
            <Carousel interval={5000}>
              {bannerItems.map((item, i) => (
                <NextLink key={i} href="/products" passHref>
                  <Link>
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.name}
                      sx={{ height: "80vh" }}
                    ></CardMedia>
                  </Link>
                </NextLink>
              ))}
            </Carousel>
          </Grid>
        </Grid>

        <Box sx={{ mb: "50px" }}>
          <Typography
            variant="h1"
            sx={{ marginBottom: "20px", fontWeight: "bold" }}
          >
            See Our New Collection
          </Typography>

          <HomeImageList />
        </Box>
      </Container>
      <Container maxWidth="lg" sx={{ mb: "50px" }}>
        <About />
      </Container>

      <Divider />
      <Container maxWidth="lg" sx={{ mb: "50px", mt: "50px" }}>
        <CallToAction />
      </Container>
      <Divider />

      <Container maxWidth="lg" sx={{ mt: "50px" }}>
        <Services />
      </Container>
    </Layout>
  );
}
