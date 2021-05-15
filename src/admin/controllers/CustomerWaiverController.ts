import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from '@hapi/joi';

import { AddWaiverUseCase } from '../../shared/useCases/customer/waiver/AddWaiverUseCase';
import { DeleteWaiverUseCase } from '../../shared/useCases/customer/waiver/DeleteWaiverUseCase';
import { ListWaiverUseCase } from '../../shared/useCases/customer/waiver/ListWaiversUseCase';
import { SignWaiverUserCase } from '../../shared/useCases/customer/waiver/SignWaiverUseCase';

const AddSchema = Joi.object({
  waiverId: Joi.number().required()
});

const SignSchema = Joi.object({
  customerId: Joi.number().required(),
  waiverId: Joi.number().required(),
  signedUrl: Joi.string().required()
});

export class CustomerWaiverController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId } = req.params;
      const usecase = new ListWaiverUseCase();
      const list = await usecase.handle(Number(customerId));
      return res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId } = req.params;
      const { waiverId } = req.body;
      await AddSchema.validateAsync({ waiverId });
      const usecase = new AddWaiverUseCase();
      await usecase.handle(Number(customerId), Number(waiverId));
      return res.sendStatus(StatusCodes.CREATED);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId, waiverId } = req.params;
      const usecase = new DeleteWaiverUseCase();
      await usecase.handle(Number(customerId), Number(waiverId));
      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  async sign(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await SignSchema.validateAsync({
        customerId: req.params.customerId,
        waiverId: req.body.waiverId,
        signedUrl: (req.file as any)?.url
      });
      const usecase = new SignWaiverUserCase();
      await usecase.handle(data);
      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
}

export const makeCustomerWaiverController = () => new CustomerWaiverController();
