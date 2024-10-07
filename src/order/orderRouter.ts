import express from "express";
import authenticate from "../common/middleware/authenticate";
import {} from "./orderController";
import { asyncWrapper } from "../utils";
import { OrderController } from "./orderController";
import logger from "../config/logger";
import { OrderService } from "./orderService";

const router = express.Router();

const orderService = new OrderService();
const orderController = new OrderController(orderService, logger);

router.post("/", authenticate, asyncWrapper(orderController.create));

export default router;
