import { Router } from 'express';

import { Permission } from '../../../shared/models/entities/Permission';
import { checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.post(
  '/checkout/customers/:customerId/cards',
  checkPermission('checkout', Permission.OrderList)
);
router.post(
  '/checkout/pay-with-money',
  checkPermission('checkout', Permission.OrderCheckout)
);
router.post(
  '/checkout/pay-with-card',
  checkPermission('checkout', Permission.OrderCheckout)
);

export default router;
