import React from "react";
import { Box, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";

const finishedOrders = [
  {
    id: 1,
    deliveryCost: 2,
    products: [
      {
        id: 1,
        productName: "Kebab",
        imagePath: "/img/kebab-fresh.webp",
        price: 12,
        quantity: 2,
      },
      {
        id: 2,
        productName: "Kebab",
        imagePath: "/img/kebab-fresh.webp",
        price: 12,
        quantity: 2,
      },
      {
        id: 3,
        productName: "Kebab",
        imagePath: "/img/kebab-fresh.webp",
        price: 12,
        quantity: 2,
      },
    ],
  },
];

export default function FinishedOrders() {
  return (
    <TabPanel value="3">
      <Stack>
        {finishedOrders.length > 0 ? (
          finishedOrders.map((order) => {
            const productTotal = order.products.reduce(
              (total, product) => total + product.price * product.quantity,
              0,
            );

            const totalPrice = productTotal + order.deliveryCost;

            return (
              <Box key={order.id} className="order-main-box">
                <Box className="order-box-scroll">
                  {order.products.map((product) => (
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

                    <img
                      src="/icons/plus.svg"
                      alt=""
                      style={{ marginLeft: "20px" }}
                    />

                    <p>Delivery cost</p>
                    <p>${order.deliveryCost}</p>

                    <img
                      src="/icons/pause.svg"
                      alt=""
                      style={{ marginLeft: "20px" }}
                    />

                    <p>Total</p>
                    <p>${totalPrice}</p>
                  </Box>
                </Box>
              </Box>
            );
          })
        ) : (
          <Box display="flex" flexDirection="row" justifyContent="center">
            <img
              src="/icons/noimage-list.svg"
              alt="No finished orders"
              style={{ width: 300, height: 300 }}
            />
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}
