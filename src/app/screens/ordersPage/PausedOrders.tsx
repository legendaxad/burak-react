import React from "react";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";

const products = [
  {
    id: 1,
    productName: "Kebab",
    imagePath: "/img/kebab-fresh.webp",
    price: 9,
    quantity: 2,
  },
  {
    id: 2,
    productName: "Cutlet",
    imagePath: "/img/cutlet.webp",
    price: 9,
    quantity: 2,
  },
  {
    id: 3,
    productName: "Lavash",
    imagePath: "/img/lavash.webp",
    price: 9,
    quantity: 2,
  },
];

const orders = [
  { id: 1, deliveryCost: 2 },
  { id: 2, deliveryCost: 2 },
];

export default function PausedOrders() {
  return (
    <TabPanel value="1">
      <Stack>
        {orders.map((order) => {
          const productTotal = products.reduce(
            (total, product) => total + product.price * product.quantity,
            0,
          );

          const totalPrice = productTotal + order.deliveryCost;

          return (
            <Box key={order.id} className="order-main-box">
              <Box className="order-box-scroll">
                {products.map((product) => (
                  <Box key={product.id} className="orders-name-price">
                    <img
                      src={product.imagePath}
                      alt={product.productName}
                      className="order-dish-img"
                    />

                    <p className="title-dish">{product.productName}</p>

                    <Box className="price-box">
                      <p>${product.price}</p>
                      <img src="/icons/close.svg" alt="" />
                      <p>{product.quantity}</p>
                      <img src="/icons/pause.svg" alt="" />
                      <p style={{ marginLeft: "15px" }}>
                        ${product.price * product.quantity}
                      </p>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Box className="total-price-box">
                <Box className="box-total">
                  <p>Product price</p>
                  <p>${productTotal}</p>

                  <p>Delivery cost</p>
                  <p>${order.deliveryCost}</p>

                  <p>Total</p>
                  <p>${totalPrice}</p>
                </Box>

                <Button variant="contained" color="secondary">
                  Cancel
                </Button>

                <Button variant="contained">Payment</Button>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
}
