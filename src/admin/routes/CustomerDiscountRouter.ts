import { Router } from 'express';

import controller from '../controllers/CustomerDiscountController';

const router = Router();

router.get('/discounts', controller.index.bind(controller));
router.get('/discounts/:id', controller.get.bind(controller));
router.post('/discounts', controller.store.bind(controller));
router.put('/discounts', controller.update.bind(controller));
router.delete('/discounts/:id', controller.destroy.bind(controller));

export default router;
