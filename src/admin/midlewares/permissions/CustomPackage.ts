import { Router } from 'express';
import { ACTIONS, checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get(
  '/customers/:customerId/custom-packages',
  checkPermission('packages', ACTIONS.LIST)
);
router.get(
  '/customers/:customerId/custom-packages/:id',
  checkPermission('packages', ACTIONS.LIST)
);
router.post(
  '/customers/:customerId/custom-packages',
  checkPermission('packages', ACTIONS.CREATE)
);
router.put(
  '/customers/:customerId/custom-packages',
  checkPermission('packages', ACTIONS.UPDATE)
);

export default router;
