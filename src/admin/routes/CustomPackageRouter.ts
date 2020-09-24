import { Router } from 'express';

import controller from '../controllers/CustomPackageController';

const router = Router();

router.get(
  '/customers/:customerId/custom-packages',
  controller.index.bind(controller)
);
router.get(
  '/customers/:customerId/custom-packages/:id',
  controller.get.bind(controller)
);
router.post(
  '/customers/:customerId/custom-packages',
  controller.store.bind(controller)
);
router.put(
  '/customers/:customerId/custom-packages',
  controller.update.bind(controller)
);
router.delete(
  '/customers/:customerId/custom-packages/:id',
  controller.destroy.bind(controller)
);

export default router;
