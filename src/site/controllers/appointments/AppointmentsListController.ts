import { NextFunction, Request, Response } from 'express';
import { AppointmentsListUseCase } from '../../use-cases/appointments/AppointmentsListUseCase';

export class AppointmentsListController {
  constructor(private use_case: AppointmentsListUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.use_case.list({
        user_id: req.user.id,
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10
      });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

export const makeAppointmetnsListController = () => {
  const use_case = new AppointmentsListUseCase();
  return new AppointmentsListController(use_case);
};
