import { Router } from 'express';

import controller from '../controllers/OrderController';

const router = Router();

router.get('/orders', controller.index.bind(controller));
router.get('/orders/:id', controller.get.bind(controller));

export default router;
