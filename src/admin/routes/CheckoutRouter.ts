import { Router } from 'express';

import controller from '../controllers/CheckoutController';

const router = Router();

router.get(
  '/checkout/customers/:customerId/cards',
  controller.cards.bind(controller)
);

router.post(
  '/checkout/pay-with-money',
  controller.payWithMoney.bind(controller)
);

router.post('/checkout/pay-with-card', controller.payWithCard.bind(controller));

export default router;
