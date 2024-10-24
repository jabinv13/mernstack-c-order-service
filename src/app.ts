import express, { Request, Response } from "express";
import { globalErrorHandler } from "./common/middleware/globalErrorHandler";
import cookieParser from "cookie-parser";
import customerRouter from "./customer/customerRouter";
import couponRouter from "./coupon/couponRouter";
import orderRouter from "./order/orderRouter";
import paymentRouter from "./payment/paymentRouter";
import config from "config";

import cors from "cors";

const app = express();
app.use(cookieParser());
app.use(express.json());

const ALLOWED_DOMAINS = [
  config.get("frontend.clientUI"),
  config.get("frontend.adminUI"),
];

app.use(
  cors({
    //todo:move to .env file
    origin: ALLOWED_DOMAINS as string[],
    credentials: true,
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from order service service!" });
});

app.use("/customer", customerRouter);
app.use("/coupons", couponRouter);
app.use("/orders", orderRouter);
app.use("/payments", paymentRouter);

app.use(globalErrorHandler);

export default app;
