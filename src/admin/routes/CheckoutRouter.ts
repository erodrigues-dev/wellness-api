import { Router } from 'express';

import controller from '../controllers/CheckoutController';

const router = Router();

router.post(
  '/checkout/calculate-discount',
  controller.calculateDiscount.bind(controller)
);

export default router;
