import { ProductMessage } from "../types";
import productCacheModel from "./productCacheModel";

export const handleProductUpdate = async (value: string) => {
  // todo: wrap this parsing in try catch
  //todo:utilize event
  const product: ProductMessage = JSON.parse(value);

  return await productCacheModel.updateOne(
    {
      productId: product.data.id,
    },
    {
      $set: {
        priceConfiguration: product.data.priceConfiguration,
      },
    },
    { upsert: true },
  );
};
