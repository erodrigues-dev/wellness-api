import { NextFunction, Request, Response } from 'express';
import { MyServicesListUseCase } from '../../use-cases/my-services/MyServicesListUseCase';

export class MyServicesListController {
  constructor(private useCase: MyServicesListUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const list = await this.useCase.list(req.user.id);
      return res.json(list);
    } catch (error) {
      next(error);
    }
  }
}

export const makeMyServicesListController = () => new MyServicesListController(new MyServicesListUseCase());
