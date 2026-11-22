import axios from "axios";
import { serverApi } from "../../lib/config";
import { CartItem } from "../../lib/types/search";
import { Order, OrderInquiry, OrderItemInput } from "../../lib/types/order";
class OrderService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }
  public async createOrder(input: CartItem[]): Promise<Order> {
    try {
      const orderItem: OrderItemInput[] = input.map((cartItem: CartItem) => ({
        itemQuantity: cartItem.quantity,
        itemPrice: cartItem.price,
        productId: cartItem._id,
      }));
      const response = await axios.post(
        this.path + "/order/create",
        orderItem,
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  }
  public async getMyOrders(input: OrderInquiry): Promise<Order[]> {
    try {
      const url = `${this.path}/order/all`;
      const query = `?page=${input.page}&limit=${input.limit}&orderStatus=${input.orderStatus}`;
      const response = await axios.get(url + query, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error("Error retrieving orders:", error);
      throw error;
    }
  }
}
export default OrderService;
