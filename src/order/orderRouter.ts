import express from "express";
import authenticate from "../common/middleware/authenticate";
import {} from "./orderController";
import { asyncWrapper } from "../utils";
import { OrderController } from "./orderController";
import logger from "../config/logger";
import { OrderService } from "./orderService";
import { StripeGW } from "../payment/stripe";
import { createMessageBroker } from "../common/factories/brokerFactory";

const router = express.Router();

const paymentGw = new StripeGW();

const broker = createMessageBroker();

const orderService = new OrderService();
const orderController = new OrderController(
  orderService,
  logger,
  paymentGw,
  broker,
);

router.post("/", authenticate, asyncWrapper(orderController.create));
router.get("/", authenticate, asyncWrapper(orderController.getAll));
router.get("/mine", authenticate, asyncWrapper(orderController.getMine));
router.get("/:orderId", authenticate, asyncWrapper(orderController.getSingle));
router.patch(
  "/change-status/:orderId",
  authenticate,
  asyncWrapper(orderController.changeStatus),
);

export default router;
