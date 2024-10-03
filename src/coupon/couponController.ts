import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { CouponService } from "./couponService";
import { Logger } from "winston";

export class CouponController {
  constructor(
    private couponService: CouponService,
    private logger: Logger,
  ) {
    this.create = this.create.bind(this);
  }
  create = async (req: Request, res: Response) => {
    const { title, code, validUpto, discount, tenantId } = req.body;

    // todo: add request validation.
    // todo: check if creator is admin or a manger of that restaurant.

    // todo: add logging
    const coupon = await this.couponService.create(
      title,
      code,
      validUpto,
      tenantId,
      discount,
    );

    return res.json(coupon);
  };

  // todo: Complete CRUD assignment. This will be used in dashboard.

  verify = async (req: Request, res: Response, next: NextFunction) => {
    const { code, tenantId } = req.body;

    // todo: request validation

    // todo: add service layer with dependency injection.
    const coupon = await this.couponService.find(code, tenantId);

    if (!coupon) {
      const error = createHttpError(400, "Coupon does not exists");
      return next(error);
    }

    // validate expiry
    const currentDate = new Date();
    const couponDate = new Date(coupon.validUpto);

    if (currentDate <= couponDate) {
      return res.json({ valid: true, discount: coupon.discount });
    }

    return res.json({ valid: false, discount: 0 });
  };
}
