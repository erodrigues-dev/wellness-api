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
      const squareCustomer = await squareUserService.create(customer);
      return res.json(squareCustomer);
    } catch (error) {
      next(error);
    }
  }

  async createCustomerCard(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId } = req.params;
      const { cardId } = req.body;
      const data = await squareUserService.createCard(customerId, cardId);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default new SquareController();
