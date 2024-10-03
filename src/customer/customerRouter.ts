import express from "express";
import { asyncWrapper } from "../utils";
import { CustomerController } from "./customerController";
import authenticate from "../common/middleware/authenticate";
import { CustomerService } from "./customerService";
import logger from "../config/logger";

const router = express.Router();

const customerService = new CustomerService();

const customerController = new CustomerController(customerService, logger);

router.get("/", authenticate, asyncWrapper(customerController.get));

export default router;
