import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
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
  const [page, setPage] = useState(1);
  const productsPerPage = 8;
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const totalPagesCount = Math.ceil(products.length / productsPerPage);

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
                className="single-button-search"
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
              {currentProducts.length > 0 ? (
                currentProducts.map((ele, index) => {
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
          <Stack className="pagination-section">
            <Pagination
              count={totalPagesCount}
              page={page}
              onChange={handlePageChange}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color="secondary"
                />
              )}
            />
          </Stack>
        </Stack>
      </Container>
      <div className="brands-logo">
        <Container className="family-brands ">
          <Box className="category-title">Our Family Brands</Box>
          <Stack className="brand-list">
            <Box className="review-box">
              <img src="/img/gurme.webp" alt="" />
            </Box>
            <Box className="review-box">
              <img src="/img/seafood.webp" alt="" />
            </Box>
            <Box className="review-box">
              <img src="/img/doner.webp" alt="" />
            </Box>
            <Box className="review-box">
              <img src="/img/sweets.webp" alt="" />
            </Box>
          </Stack>
        </Container>
      </div>
      <div className="address">
        <Container>
          <Stack className="address-area">
            <Box className="title">Our address</Box>
            <iframe
              title="Burak Restaurant location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96326.03685561026!2d28.92022666528895!3d41.02112846139867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab82bea99445f%3A0x6ed7f4baceb4476c!2sMaiden's%20Tower!5e0!3m2!1sen!2skr!4v1757106097524!5m2!1sen!2skr"
              width="1320"
              height="500"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ marginTop: "60px" }}
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
