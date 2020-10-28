import { Router } from 'express';
import { ACTIONS, checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.post(
  '/orders/pay-with-money',
  checkPermission('orders', ACTIONS.CREATE)
);

export default router;
