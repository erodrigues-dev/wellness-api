import { parseISO } from 'date-fns';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import service, { FilterDto } from '../../shared/services/ScheduleService';
import { ScheduleCreateUseCase } from '../../shared/useCases/schedule/ScheduleCreateUseCase';

export class ScheduleController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId, page, limit } = req.query;

      console.log(customerId, page, limit);

      const filter = new FilterDto(
        Number(customerId) || null,
        Number(page),
        Number(limit)
      );
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
      const { customerId, timeId, date } = req.body;

      const useCase = new ScheduleCreateUseCase(
        customerId,
        timeId,
        parseISO(date)
      );

      await useCase.create();

      return res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
}

export default new ScheduleController();
