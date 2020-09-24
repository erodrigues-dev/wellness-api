import { Router } from 'express';

import controller from '../controllers/CustomPackageController';

const router = Router();

router.get(
  '/customers/:customerId/packages',
  controller.index.bind(controller)
);
router.get(
  '/customers/:customerId/packages/:id',
  controller.get.bind(controller)
);
router.post(
  '/customers/:customerId/packages',
  controller.store.bind(controller)
);
router.put(
  '/customers/:customerId/packages',
  controller.update.bind(controller)
);
router.delete(
  '/customers/:customerId/packages/:id',
  controller.destroy.bind(controller)
);

export default router;
