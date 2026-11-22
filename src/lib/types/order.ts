import { OrderStatus } from "../enums/order.enum";
import { Product } from "./products";

export interface OrderItemInput {
  itemQuantity: number;
  itemPrice: number;
  productId: string;
  orderId?: string;
}
export interface Order {
  _id: string;
  memberId: string;
  orderTotal: number;
  orderDelivery: number;
  orderStatus: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  //   from aggregation
  orderItem: OrderItem[];
  productData: Product[];
}

export interface OrderItem {
  _id: string;
  itemPrice: number;
  itemQuantity: number;
  orderId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderInquiry {
  page: number;
  limit: number;
  orderStatus: OrderStatus;
}
export interface OrderUpdateInput {
  orderId: string;
  orderStatus: OrderStatus;
}
