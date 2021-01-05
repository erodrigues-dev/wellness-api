import { parseISO } from 'date-fns';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import service, { FilterDto } from '../../shared/services/ScheduleService';
import {
  ScheduleCancelUseCase,
  ScheduleCreateUseCase
} from '../../shared/useCases/schedule';

export class ScheduleController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const filter = FilterDto.parse(req.query);
      const result = await service.list(filter);

      return res
        .header('x-total-count', result.total.toString())
        .json(result.list);
    } catch (error) {
      next(error);
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        customerId,
        orderActivityId,
        activityScheduleId,
        date
      } = req.body;

      const useCase = new ScheduleCreateUseCase(
        customerId,
        orderActivityId,
        activityScheduleId,
        parseISO(date)
      );

      await useCase.create();

      return res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }

  async changeStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const useCase = new ScheduleCancelUseCase(
        Number(req.params.id),
        req.params.status
      );
      await useCase.changeStatus();
      return res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
}

export default new ScheduleController();
