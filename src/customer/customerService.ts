import customerModel from "./customerModel";
import { newCustomer } from "./customerTypes";

export class CustomerService {
  async get(userId: string) {
    const customer = customerModel.findOne({ userId });
    return customer;
  }

  async create(customer: newCustomer) {
    const newCustomer = await customerModel.create(customer);
    return newCustomer.save();
  }

  async update(userId: string, _id: string, text: string) {
    console.log(text);
    return await customerModel.findOneAndUpdate(
      {
        _id,
        userId,
      },
      {
        $push: {
          addresses: {
            text: text,
            // todo: implement isDefault field in future.
            isDefault: false,
          },
        },
      },
      { new: true },
    );
  }
}
