import { NextFunction, Request, Response } from 'express';

import { SquareCustomer } from '../../shared/square/models/SquareCustomer';
import { squareCustomerService } from '../../shared/square/services/index';

export class SquareController {
  async getCustomerById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const customer = await squareCustomerService.getById(id);
      return res.json(customer);
    } catch (error) {
      next(error);
    }
  }

  async getCustomerByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.params;
      const customer = await squareCustomerService.getByEmail(email);
      return res.json(customer);
    } catch (error) {
      next(error);
    }
  }

  async createCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const customer = new SquareCustomer(req.body);
      const squareCustomer = await squareCustomerService.create(customer);
      return res.json(squareCustomer);
    } catch (error) {
      next(error);
    }
  }

  async createCustomerCard(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId } = req.params;
      const { cardId, cardName } = req.body;
      const data = await squareCustomerService.createCard(
        customerId,
        cardId,
        cardName
      );
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async listCards(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId } = req.params;

      const data = await squareCustomerService.listCards(customerId);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default new SquareController();
