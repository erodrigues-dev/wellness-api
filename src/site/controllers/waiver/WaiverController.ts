import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AddWaiverUseCase } from '../../../shared/useCases/customer/waiver/AddWaiverUseCase';
import { GetWaiverDetailByActivityUseCase } from '../../../shared/useCases/customer/waiver/GetWaiverDetailByActivityUseCase';
import service from '../../../shared/services/WaiverService';

export class WaiverController {
  async getWaiverByActivity(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: customerId } = req.user;
      const { activityId } = req.params;
      const useCase = new GetWaiverDetailByActivityUseCase();
      const waiver = await useCase.handle(customerId, activityId);
      return res.json(waiver);
    } catch (error) {
      next(error);
    }
  }

  async addWaiverIsCustomerAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: customerId } = req.user;
      const { waiverId } = req.params;
      const useCase = new AddWaiverUseCase();
      await useCase.handle(customerId, Number(waiverId));
      return res.sendStatus(StatusCodes.CREATED);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { waiverId } = req.params;
      const waiver = await service.get(Number(waiverId));
      return res.json(waiver);
    } catch (error) {
      next(error);
    }
  }
}

export const makeWaiverController = () => new WaiverController();
