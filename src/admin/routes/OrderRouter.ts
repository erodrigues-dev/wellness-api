import { Router } from 'express';

import controller from '../controllers/OrderController';

const router = Router();

router.get('/orders', controller.index.bind(controller));
router.post('/orders/pay-with-money', controller.payWithMoney.bind(controller));
router.post('/orders/pay-with-card', controller.payWithCard.bind(controller));

export default router;
