import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AddWaiverUseCase } from '../../shared/useCases/customer/waiver/AddWaiverUseCase';
import { DeleteWaiverUseCase } from '../../shared/useCases/customer/waiver/DeleteWaiverUseCase';
import { ListWaiverUseCase } from '../../shared/useCases/customer/waiver/ListWaiversUseCase';
import { SignWaiverUserCase } from '../../shared/useCases/customer/waiver/SignWaiverUseCase';

export class CustomerWaiverController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId } = req.params;
      const usecase = new ListWaiverUseCase();
      const list = await usecase.handle(Number(customerId));
      return res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId } = req.params;
      const { waiverId } = req.body;
      const usecase = new AddWaiverUseCase(Number(customerId), Number(waiverId));
      await usecase.handle();
      return res.sendStatus(StatusCodes.CREATED);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId, waiverId } = req.params;
      const usecase = new DeleteWaiverUseCase();
      await usecase.handle(Number(customerId), Number(waiverId));
      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  async sign(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId } = req.params;
      const { waiverId, signedUrl } = req.body;
      const usecase = new SignWaiverUserCase();
      await usecase.handle({
        customerId: Number(customerId),
        waiverId: Number(waiverId),
        signedUrl
      });
      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
}

export const makeCustomerWaiverController = () => new CustomerWaiverController();
