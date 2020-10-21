import { Router } from 'express';

import controller from '../controllers/CustomerDiscountController';

const router = Router();

router.get(
  '/customers/:customerId/discounts',
  controller.index.bind(controller)
);
router.post(
  '/customers/:customerId/discounts',
  controller.store.bind(controller)
);
router.put(
  '/customers/:customerId/discounts',
  controller.update.bind(controller)
);
router.delete(
  '/customers/:customerId/discounts/:id',
  controller.destroy.bind(controller)
);

export default router;
