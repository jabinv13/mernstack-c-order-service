import express from "express";
import { CouponService } from "./couponService";
import logger from "../config/logger";
import { CouponController } from "./couponController";
import authenticate from "../common/middleware/authenticate";
import { asyncWrapper } from "../utils";

const router = express.Router();

const couponService = new CouponService();

const couponController = new CouponController(couponService, logger);

router.put("/", authenticate, asyncWrapper(couponController.create));
router.post("/verify", authenticate, asyncWrapper(couponController.verify));

export default router;
