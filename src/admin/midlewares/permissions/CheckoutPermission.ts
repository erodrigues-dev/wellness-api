import { Router } from 'express';

import { ACTIONS, checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.post(
  '/checkout/calculate-discount',
  checkPermission('checkout', ACTIONS.LIST)
);
router.post(
  '/checkout/pay-with-money',
  checkPermission('checkout', ACTIONS.CREATE)
);
router.post(
  '/checkout/pay-with-card',
  checkPermission('checkout', ACTIONS.CREATE)
);

export default router;
