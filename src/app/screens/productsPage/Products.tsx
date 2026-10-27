import { Box, Button, Container, Stack, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const products = [
  {
    productName: "Kebab",
    imagePath: "/img/kebab-fresh.webp",
  },
  {
    productName: "Cutlet",
    imagePath: "/img/cutlet.webp",
  },
  {
    productName: "Kebab",
    imagePath: "/img/kebab-fresh.webp",
  },
  {
    productName: "Kebab",
    imagePath: "/img/kebab.webp",
  },
  {
    productName: "Lavash",
    imagePath: "/img/lavash.webp",
  },
  {
    productName: "Kebab",
    imagePath: "/img/kebab-fresh.webp",
  },
  {
    productName: "Cutlet",
    imagePath: "/img/cutlet.webp",
  },
  {
    productName: "Kebab",
    imagePath: "/img/kebab-fresh.webp",
  },
  {
    productName: "Kebab",
    imagePath: "/img/kebab.webp",
  },
  {
    productName: "Lavash",
    imagePath: "/img/lavash.webp",
  },
];
export default function Products() {
  return (
    <div className="products">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className="avatar-big-box">
            <Box className="category-title">Burak Restaurant</Box>
            <Stack className="single-search-big-box">
              <input
                type="text"
                placeholder="Type here"
                className="single-search-input"
                name="singleResearch"
              />
              <Button
                variant="contained"
                color="primary"
                size="medium"
                className="single-button-search" // Keep your custom identifier class
              >
                SEARCH
              </Button>
            </Stack>
          </Stack>
          <Stack className="dishes-filter-section">
            <Stack className="dishes-filter-box">
              <Button variant="contained" color="primary" className="order">
                NEW
              </Button>
              <Button variant="contained" color="secondary" className="order">
                PRICE
              </Button>
              <Button variant="contained" color="secondary" className="order">
                VIEWS
              </Button>
            </Stack>
          </Stack>
          <Stack className="list-category-section">
            <Stack className="product-category">
              <div className="category-main">
                <Button variant="contained" color="secondary" className="order">
                  OTHER
                </Button>
                <Button variant="contained" color="secondary" className="order">
                  DESERT
                </Button>
                <Button variant="contained" color="secondary" className="order">
                  DRINK
                </Button>
                <Button variant="contained" color="secondary" className="order">
                  SALAD
                </Button>
                <Button variant="contained" color="primary" className="order">
                  DISH
                </Button>
              </div>
            </Stack>
            <Stack className="product-wrapper">
              {products.length > 0 ? (
                products.map((ele, index) => {
                  return (
                    <Stack className="product-card">
                      <Stack
                        className="product-img"
                        style={{
                          height: "275px",
                          backgroundImage: `url(${ele.imagePath})`,
                        }}
                      >
                        <div className="product-sale">LARGE size</div>

                        {/* Grouped overlay container */}
                        <Stack direction="row" className="overlay-buttons">
                          <Button
                            size="medium"
                            variant="text"
                            className="shop-btn"
                          >
                            <ShoppingCartIcon sx={{ color: "#fff" }} />
                          </Button>
                          <Button
                            size="medium"
                            variant="text"
                            className="view-btn"
                          >
                            <VisibilityIcon sx={{ color: "#fff" }} />
                          </Button>
                        </Stack>
                      </Stack>

                      <Stack className="product-desc">
                        <Typography className="product-title">
                          {ele.productName}
                        </Typography>

                        <Box className="price">
                          <img src="/icons/money.svg" alt="" />
                          <p>15</p>
                        </Box>
                      </Stack>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">New products are not available</Box>
              )}
            </Stack>
          </Stack>
          <Stack className="pagination-section">h4</Stack>
        </Stack>
      </Container>
    </div>
  );
}
