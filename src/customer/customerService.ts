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
}
