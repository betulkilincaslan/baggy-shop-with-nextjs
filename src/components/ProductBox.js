import NextLink from "next/link";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  styled,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { grey } from "@mui/material/colors";

export default function ProductBox({ product, addToCartHandler }) {
  const StyledRating = styled(Rating)({});
  return (
    <Card>
      <NextLink href={`/products/${product.slug}`} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            width="400"
            height="400"
            image={product.image}
            alt={product.name}
          ></CardMedia>
          <CardContent>
            <Typography
              gutterBottom
              variant="h2"
              component="div"
              color={grey[800]}
            >
              {product.name}
            </Typography>
            <StyledRating
              sx={{ color: "primary.dark" }}
              readOnly
              name="like-review"
              // defaultValue={2}
              value={product.rating}
              precision={0.5}
              icon={<FavoriteIcon fontSize="inherit" />}
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            />
          </CardContent>
        </CardActionArea>
      </NextLink>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: "10px 20px",
        }}
      >
        <Typography color={grey[800]}>${product.price}</Typography>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => addToCartHandler(product)}
          sx={{ p: "10px 0" }}
        >
          <AddShoppingCartIcon fontSize="small" />
        </Button>
      </CardActions>
    </Card>
  );
}
