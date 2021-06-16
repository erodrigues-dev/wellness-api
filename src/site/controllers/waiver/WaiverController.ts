import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AddWaiverUseCase } from '../../../shared/useCases/customer/waiver/AddWaiverUseCase';
import { GetWaiverDetailByActivityUseCase } from '../../../shared/useCases/customer/waiver/GetWaiverDetailByActivityUseCase';
import { GetWaiverDetailUseCase } from '../../../shared/useCases/customer/waiver/GetWaiverDetailUseCase';
import { SignWaiverUserCase } from '../../../shared/useCases/customer/waiver/SignWaiverUseCase';

export class WaiverController {
  constructor(
    private addUseCase: AddWaiverUseCase,
    private getByActivityUseCase: GetWaiverDetailByActivityUseCase,
    private getUseCase: GetWaiverDetailUseCase,
    private signUseCase: SignWaiverUserCase
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

  async sign(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: customerId } = req.user;
      const { waiverId } = req.body;
      const signedUrl = (req.file as any).url;
      await this.signUseCase.handle({
        customerId,
        signedUrl,
        waiverId
      });
      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
}

export const makeWaiverController = () =>
  new WaiverController(
    new AddWaiverUseCase(),
    new GetWaiverDetailByActivityUseCase(),
    new GetWaiverDetailUseCase(),
    new SignWaiverUserCase()
  );
