import { NextFunction, Request, Response } from 'express';

import { squareUserService } from '../../shared/services/square/index';
import { SquareCustomer } from '../../shared/services/square/models/SquareCustomer';

export class SquareController {
  async getCustomerById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const customer = await squareUserService.getById(id);
      return res.json(customer);
    } catch (error) {
      next(error);
    }
  }

  async getCustomerByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.params;
      const customer = await squareUserService.getByEmail(email);
      return res.json(customer);
    } catch (error) {
      next(error);
    }
  }

  async createCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const customer = new SquareCustomer(req.body);
      const id = await squareUserService.create(customer);
      return res.json({ id });
    } catch (error) {
      next(error);
    }
  }
}

export default new SquareController();
