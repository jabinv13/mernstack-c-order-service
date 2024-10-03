import couponModel from "./couponModel";

export class CouponService {
  async create(
    title: string,
    code: string,
    validUpto: Date,
    tenantId: number,
    discount: number,
  ) {
    const coupon = await couponModel.create({
      title,
      code,
      discount,
      validUpto,
      tenantId,
    });

    return coupon.save();
  }

  async find(code: string, tenantId: number) {
    return await couponModel.findOne({ code, tenantId });
  }
}
