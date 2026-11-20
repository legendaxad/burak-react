import {
  Badge,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect, useState } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { Product } from "../../../lib/types/products";
import { createSelector } from "reselect";
import { setProducts } from "./slice";
import { retrieveProducts } from "./selector";
import ProductService from "../../service/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
// REDUX SLICE $ SLECTOR

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

export default function Products() {
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 8,
        order: "createdAt",
        productCollection: ProductCollection.DISH,
        search: "",
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);

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
                currentProducts.map((product, index) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productCollection === ProductCollection.DRINK
                      ? product.productVolume + "l"
                      : product.productSize + " size";
                  return (
                    <Stack className="product-card" key={product._id}>
                      <Stack
                        className="product-img"
                        style={{
                          height: "275px",
                          backgroundImage: `url(${imagePath})`,
                        }}
                      >
                        <div className="product-sale">{sizeVolume}</div>

                        <Stack direction="row" className="overlay-buttons">
                          <Button className={"shop-btn"}>
                            <img
                              src={"/icons/shopping-cart.svg"}
                              style={{ display: "flex" }}
                              alt=""
                            />
                          </Button>

                          <Button className={"view-btn"} sx={{ right: "3px" }}>
                            <Badge
                              badgeContent={product.productViews}
                              color="secondary"
                            >
                              <RemoveRedEyeIcon
                                sx={{
                                  color:
                                    product.productViews === 0
                                      ? "gray"
                                      : "white",
                                }}
                              />
                            </Badge>
                          </Button>
                        </Stack>
                      </Stack>

                      <Stack className="product-desc">
                        <Typography className="product-title">
                          {product.productName}
                        </Typography>

                        <Box className="price">
                          <img src="/icons/money.svg" alt="" />
                          <p>${product.productPrice}</p>
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
