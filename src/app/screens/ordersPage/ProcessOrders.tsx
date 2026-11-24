import React from "react";
import { Box, Stack, Button } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { Messages, serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/products";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { retrieveProcessOrders } from "./selector";
import { useGlobals } from "../../hooks/useGlobal";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../service/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { T } from "../../../lib/types/common";
// REDUX  SELECTOR

const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({ processOrders }),
);
interface ProcessOrdersProps {
  setValue: (input: string) => void;
}
export default function ProcessOrders(props: ProcessOrdersProps) {
  const { setValue } = props;
  const { processOrders } = useSelector(processOrdersRetriever);
  const { authMember, setorderBuilder } = useGlobals();
  const finishOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      // PAYMENT PROCESS
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.FINISH,
      };
      const confirmation = window.confirm("Have you received your order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        // order REBUILD
        setValue("3");
        setorderBuilder(new Date());
      }
    } catch (err) {
      sweetErrorHandling(err).then();
    }
  };
  return (
    <TabPanel value="2">
      <Stack>
        {processOrders.length > 0 ? (
          processOrders.map((order: Order) => {
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
                    <p>
                      $
                      {order.orderItems.reduce(
                        (total, item) =>
                          total + item.itemPrice * item.itemQuantity,
                        0,
                      )}
                    </p>

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
                    <p>
                      $
                      {order.orderItems.reduce(
                        (total, item) =>
                          total + item.itemPrice * item.itemQuantity,
                        0,
                      ) + order.orderDelivery}
                    </p>
                  </Box>

                  <p className="data-compl">
                    {moment(order.createdAt).format("YY-MM-DD HH:mm")}
                  </p>

                  <Button
                    value={order._id}
                    variant="contained"
                    className="verify-button"
                    onClick={finishOrderHandler}
                  >
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
