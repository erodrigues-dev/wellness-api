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

router.get(
  '/square/customer/:customerId/cards',
  controller.listCards.bind(controller)
);

export default router;
