import mongoose from "mongoose";
import orderModel from "./orderModel";
import { Order } from "./orderTypes";

export class OrderService {
  async createOrder(order: Order, session: mongoose.mongo.ClientSession) {
    const newOrder = await orderModel.create([order], { session });
    return newOrder;
  }
}
