import { Response } from "express";

import { Request } from "express-jwt";
import { CustomerService } from "./customerService";
import { Logger } from "winston";

export class CustomerController {
  constructor(
    private customerService: CustomerService,
    private logger: Logger,
  ) {
    this.get = this.get.bind(this);
  }
  async get(req: Request, res: Response) {
    console.log("customer ");
    // todo: add these fields to jwt in auth service.
    const { sub: userId, firstName, lastName, email } = req.auth;
    console.log("auth:..", req.auth);

    const customer = await this.customerService.get(userId);

    if (!customer) {
      const newCustomer = await this.customerService.create({
        userId,
        firstName,
        lastName,
        email,
        addresses: [],
      });

      this.logger.info(`Created an new  customer and returnig .. `);
      return res.json(newCustomer);
    }

    res.json(customer);
  }
}
