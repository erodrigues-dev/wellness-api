import { Router } from 'express';

import { Permission } from '../../../shared/models/entities/Permission';
import { checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.post(
  '/checkout/customers/:customerId/cards',
  checkPermission(Permission.OrderList)
);
router.post(
  '/checkout/pay-with-money',
  checkPermission(Permission.OrderCheckout)
);
router.post(
  '/checkout/pay-with-card',
  checkPermission(Permission.OrderCheckout)
);

export default router;
