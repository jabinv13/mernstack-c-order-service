import orderModel from "./orderModel";
import { Order } from "./orderTypes";

export class OrderService {
  async createOrder(order: Order) {
    const newOrder = await orderModel.create(order);
    return newOrder.save();
  }
}
