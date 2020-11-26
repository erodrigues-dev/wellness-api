import { NextFunction, Response } from 'express';

import customerService from '../../shared/services/CustomerService';
import ICustomerService from '../../shared/services/interfaces/ICustomerService';
import CreateCustomer from '../../shared/useCases/customer/CreateCustomer';
import { CustomerDTO } from '../../shared/useCases/customer/CustomerDTO';
import UpdateCustomer from '../../shared/useCases/customer/UpdateCustomer';
import ICustomerController, {
    IGetRequest, IIndexRequest, IStoreRequest, IUpdateRequest
} from './interfaces/ICustomerController';

export class CustomerController implements ICustomerController {
  constructor(private service: ICustomerService) {}

  async index(req: IIndexRequest, res: Response, next: NextFunction) {
    try {
      const { name, email, page, limit } = req.query;

      const total = await this.service.count({ name, email });
      const list = await this.service.list({ name, email }, page, limit);

      return res.header('X-Total-Count', total.toString()).json(list);
    } catch (error) {
      next(error);
    }
  }

  async get(req: IGetRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const model = await this.service.get(id);
      if (!model)
        return res.status(404).json({ message: 'Customer not found' });
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }

  async store(req: IStoreRequest, res: Response, next: NextFunction) {
    try {
      const dto = new CustomerDTO()
        .parseFromBody(req.body)
        .withImageUrl(req.file?.url);

      const model = await new CreateCustomer(dto).create();

      return res.json(model);
    } catch (error) {
      next(error);
    }
  }

  async update(req: IUpdateRequest, res: Response<any>, next: NextFunction) {
    try {
      const dto = new CustomerDTO()
        .parseFromBody(req.body)
        .withImageUrl(req.file?.url);

      const model = await new UpdateCustomer(dto).update();

      return res.json(model);
    } catch (error) {
      next(error);
    }
  }
}

const controller: ICustomerController = new CustomerController(customerService);

export default controller;
