import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
    UpdateSubscriptionStatusUseCase
} from '../../shared/useCases/order/UpdateSubscriptionStatusUseCase';

export class SubscriptionController {
  async receive(req: Request, res: Response, next: NextFunction) {
    try {
      const useCase = new UpdateSubscriptionStatusUseCase(req.body);
      await useCase.update();
      return res.sendStatus(StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }
}
