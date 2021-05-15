import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AddWaiverUseCase } from '../../shared/useCases/customer/AddWaiverUseCase';
import { ListWaiverUseCase } from '../../shared/useCases/customer/ListWaiversUseCase';

export class CustomerWaiverController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const usecase = new ListWaiverUseCase();
      const list = await usecase.handle(Number(id));
      return res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId, waiverId } = req.params;
      const usecase = new AddWaiverUseCase(Number(customerId), Number(waiverId));
      await usecase.handle();
      return res.sendStatus(StatusCodes.CREATED);
    } catch (error) {
      next(error);
    }
  }
}

export const makeCustomerWaiverController = () => new CustomerWaiverController();
