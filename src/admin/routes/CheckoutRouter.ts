import { Router } from 'express';

import controller from '../controllers/CheckoutController';

const router = Router();

router.post(
  '/checkout/pay-with-money',
  controller.payWithMoney.bind(controller)
);

router.post('/checkout/pay-with-card', controller.payWithCard.bind(controller));

export default router;
