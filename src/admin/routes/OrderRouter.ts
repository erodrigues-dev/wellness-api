import { Router } from 'express';

import controller from '../controllers/OrderController';

const router = Router();

router.post('/orders/pay-with-money', controller.payWithMoney.bind(controller));

export default router;
