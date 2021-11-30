import { Request, Response, NextFunction } from 'express';
import { TeamGroupListUseCase } from '../../shared/useCases/team-group/TeamGroupListUseCase';

export class TeamGroupController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit, name, memberName } = req.query as any;
      const usecase = new TeamGroupListUseCase();
      const data = await usecase.list({ page, limit, name, memberName });
      return res.header('x-total-count', String(data.count)).json(data.rows);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
}

export const makeTeamGroupController = () => new TeamGroupController();
