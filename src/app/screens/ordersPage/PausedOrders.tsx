import React from "react";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";

import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/products";
import { retrievePausedOrders } from "./selector";
import { Order, OrderItem } from "../../../lib/types/order";
// REDUX  SELECTOR

const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders }),
);

export default function PausedOrders() {
  const { pausedOrders } = useSelector(pausedOrdersRetriever);
  return (
    <TabPanel value="1">
      <Stack>
        {pausedOrders.map((order: Order) => {
          return (
            <Box key={order._id} className="order-main-box">
              <Box className="order-box-scroll">
                {order.orderItems.map((item: OrderItem) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => ele._id === item.productId,
                  )[0];
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Box key={product._id} className="orders-name-price">
                      <img
                        src={imagePath}
                        alt={product.productName}
                        className="order-dish-img"
                      />

                      <p className="title-dish">{product.productName}</p>

                      <Box className="price-box">
                        <p>${item.itemPrice}</p>
                        <img src="/icons/close.svg" alt="" />
                        <p>{item.itemQuantity}</p>
                        <img src="/icons/pause.svg" alt="" />
                        <p style={{ marginLeft: "15px" }}>
                          ${item.itemPrice * item.itemQuantity}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className="total-price-box">
                <Box className="box-total">
                  <p>Product price</p>
                  <p>${order.orderTotal - order.orderDelivery}</p>

                  <p>Delivery cost</p>
                  <p>${order.orderDelivery}</p>

                  <p>Total</p>
                  <p>${order.orderTotal}</p>
                </Box>

                <Button variant="contained" color="secondary">
                  Cancel
                </Button>

                <Button variant="contained">Payment</Button>
              </Box>
            </Box>
          );
        })}

        {!pausedOrders || pausedOrders.length === 0 ? (
          <Box
            className="no-order-box"
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <img
              style={{ width: "300px", height: "300px" }}
              src="/icons/no-order.svg"
              alt=""
            />
            <p>No paused orders</p>
          </Box>
        ) : null}
      </Stack>
    </TabPanel>
  );
}
