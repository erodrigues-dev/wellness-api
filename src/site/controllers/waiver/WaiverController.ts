import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AddWaiverUseCase } from '../../../shared/useCases/customer/waiver/AddWaiverUseCase';
import { GetWaiverDetailByActivityUseCase } from '../../../shared/useCases/customer/waiver/GetWaiverDetailByActivityUseCase';
import { GetWaiverDetailUseCase } from '../../../shared/useCases/customer/waiver/GetWaiverDetailUseCase';

export class WaiverController {
  constructor(
    private addUseCase: AddWaiverUseCase,
    private getByActivityUseCase: GetWaiverDetailByActivityUseCase,
    private getUseCase: GetWaiverDetailUseCase
  ) {}

  async getWaiverByActivity(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: customerId } = req.user;
      const { activityId } = req.params;
      const waiver = await this.getByActivityUseCase.handle(customerId, activityId);
      return res.json(waiver);
    } catch (error) {
      next(error);
    }
  }

  async addWaiverIsCustomerAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: customerId } = req.user;
      const { waiverId } = req.params;
      await this.addUseCase.handle(customerId, Number(waiverId));
      return res.sendStatus(StatusCodes.CREATED);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: customerId } = req.user;
      const { waiverId } = req.params;
      const waiver = await this.getUseCase.handle(customerId, Number(waiverId));
      return res.json(waiver);
    } catch (error) {
      next(error);
    }
  }
}

export const makeWaiverController = () =>
  new WaiverController(new AddWaiverUseCase(), new GetWaiverDetailByActivityUseCase(), new GetWaiverDetailUseCase());
