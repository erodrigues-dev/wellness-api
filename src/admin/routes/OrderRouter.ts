import { Router } from 'express';

import controller from '../controllers/OrderController';

const router = Router();

router.get('/orders', controller.index.bind(controller));
router.get('/orders/:id', controller.get.bind(controller));
router.put('/orders/:id/cancel', controller.cancel.bind(controller));

export default router;
