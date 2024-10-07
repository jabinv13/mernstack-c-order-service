import { Request } from "express";
import mongoose from "mongoose";

export type AuthCookie = {
  accessToken: string;
};

export interface AuthRequest extends Request {
  auth: {
    sub: string;
    role: string;
    id?: string;
    tenant: string;
  };
}

export interface PriceConfiguration {
  priceType: "base" | "aditional";
  availableOptions: {
    [key: string]: number;
  };
}

export interface ProductPricingCache {
  productId: string;
  priceConfiguration: PriceConfiguration;
}

export interface ProductMessage {
  id: string;
  priceConfiguration: PriceConfiguration;
}

export interface ToppingPriceCache {
  _id: mongoose.Types.ObjectId;
  toppingId: string;
  price: number;
  tenantId: string;
}

export interface ToppingMessage {
  id: string;
  price: number;
  tenantId: string;
}
