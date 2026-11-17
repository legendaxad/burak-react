import { serverApi } from "../../lib/config";
import axios from "axios";
import { Product, ProductInquiry } from "../../lib/types/products";

class ProductService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getProducts(input: ProductInquiry): Promise<Product[]> {
    try {
      let url = `${this.path}/product/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;

      if (input.productCollection) {
        url += `&productCollection=${input.productCollection}`;
      }

      if (input.search) {
        url += `&search=${input.search}`;
      }

      console.log("Request URL:", url);

      const result = await axios.get(url);

      console.log("getProducts:", result.data);

      return result.data;
    } catch (err) {
      console.error("Error, getProducts:", err);
      throw err;
    }
  }
}

export default ProductService;
