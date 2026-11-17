import React from "react";
import { Box, Stack, Button } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";

const products = [
  {
    id: 1,
    productName: "Kebab",
    imagePath: "/img/kebab-fresh.webp",
    price: 11,
    quantity: 2,
  },
  {
    id: 2,
    productName: "Cutlet",
    imagePath: "/img/cutlet.webp",
    price: 11,
    quantity: 2,
  },
  {
    id: 3,
    productName: "Lavash",
    imagePath: "/img/lavash.webp",
    price: 11,
    quantity: 2,
  },
];

const orders = [{ id: 1, deliveryCost: 2, createdAt: new Date() }];

export default function ProcessOrders() {
  return (
    <TabPanel value="2">
      <Stack>
        {orders.length > 0 ? (
          orders.map((order) => {
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

                  <p className="data-compl">
                    {moment(order.createdAt).format("YY-MM-DD HH:mm")}
                  </p>

                  <Button variant="contained" className="verify-button">
                    Verify to Fulfil
                  </Button>
                </Box>
              </Box>
            );
          })
        ) : (
          <Box display="flex" flexDirection="row" justifyContent="center">
            <img
              src="/icons/noimage-list.svg"
              alt="No orders available"
              style={{ width: 300, height: 300 }}
            />
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}
