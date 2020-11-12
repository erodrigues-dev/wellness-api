import { NextFunction, Request, Response, Router } from 'express';

import controller from '../controllers/SquareController';

const router = Router();

router.get('/square/customer/:id', controller.getCustomerById.bind(controller));

router.get(
  '/square/customer/get-by-email/:email',
  controller.getCustomerByEmail.bind(controller)
);

router.post('/square/customer', controller.createCustomer.bind(controller));

router.post(
  '/square/customer/:customerId/cards',
  controller.createCustomerCard.bind(controller)
);

router.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error.isAxiosError) {
    return res
      .status(error.response.status)
      .json({ message: error.response.statusText });
  }

  next(error);
});

export default router;
