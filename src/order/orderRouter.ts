import express from "express";
import authenticate from "../common/middleware/authenticate";
import {} from "./orderController";
import { asyncWrapper } from "../utils";
import { OrderController } from "./orderController";
import logger from "../config/logger";
import { OrderService } from "./orderService";
import { StripeGW } from "../payment/stripe";

const router = express.Router();

const paymentGw = new StripeGW();

const orderService = new OrderService();
const orderController = new OrderController(orderService, logger, paymentGw);

router.post("/", authenticate, asyncWrapper(orderController.create));

export default router;
