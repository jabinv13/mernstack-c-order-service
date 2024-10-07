import { Request, Response } from "express";
import { OrderService } from "./orderService";
import { Logger } from "winston";
export class OrderController {
  constructor(
    private orderService: OrderService,
    private logger: Logger,
  ) {}

  async create(req: Request, res: Response) {
    return res.json({ id: "nskks" });
  }
}
