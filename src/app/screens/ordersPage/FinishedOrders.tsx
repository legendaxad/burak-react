import React from "react";
import { Box, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";

import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/products";
import { retrieveFinishedOrders } from "./selector";
import { Order, OrderItem } from "../../../lib/types/order";
// REDUX  SELECTOR

const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({
    finishedOrders,
  }),
);

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(finishedOrdersRetriever);

  return (
    <TabPanel value="3">
      <Stack>
        {finishedOrders.length > 0 ? (
          finishedOrders.map((order: Order) => {
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

                    <img
                      src="/icons/plus.svg"
                      alt=""
                      style={{ marginLeft: "20px" }}
                    />

                    <p>Delivery cost</p>
                    <p>${order.orderDelivery}</p>

                    <img
                      src="/icons/pause.svg"
                      alt=""
                      style={{ marginLeft: "20px" }}
                    />

                    <p>Total</p>
                    <p>${order.orderTotal}</p>
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
