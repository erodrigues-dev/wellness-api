import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import customerService, { CustomerService } from '../../shared/services/CustomerService';
import { CreateCustomerModel } from '../../shared/useCases/customer/create/CreateCustomerModel';
import CreateCustomerUseCase from '../../shared/useCases/customer/create/CreateCustomerUseCase';
import { ListActivitiesUseCase } from '../../shared/useCases/customer/ListActivitiesUseCase';
import { UpdateCustomerModel } from '../../shared/useCases/customer/update/UpdateCustomerModel';
import UpdateCustomerUseCase from '../../shared/useCases/customer/update/UpdateCustomerUseCase';
import ICustomerController, {
  IGetRequest,
  IIndexRequest,
  IStoreRequest,
  IUpdateRequest
} from './interfaces/ICustomerController';

export class CustomerController implements ICustomerController {
  constructor(private service: CustomerService) {}

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
      if (!model) return res.status(404).json({ message: 'Customer not found' });
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }

  async store(req: IStoreRequest, res: Response, next: NextFunction) {
    try {
      const dto = new CreateCustomerModel().parse(req.body).withImageUrl(req.file?.url);

      const model = await new CreateCustomerUseCase(dto).create();

      return res.json(model);
    } catch (error) {
      next(error);
    }
  }

  async update(req: IUpdateRequest, res: Response<any>, next: NextFunction) {
    try {
      const dto = new UpdateCustomerModel().parse(req.body).withImageUrl(req.file?.url);

      const model = await new UpdateCustomerUseCase(dto).update();

      return res.json(model);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.delete(Number(req.params.id));
      return res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }

  async getActivities(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const useCase = new ListActivitiesUseCase(id);
      const activities = await useCase.list();
      return res.json(activities);
    } catch (error) {
      next(error);
    }
  }
}

export default new CustomerController(customerService);
