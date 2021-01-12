import { Router } from 'express';

import { Permission } from '../../../shared/models/entities/Permission';
import { checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get('/discounts', checkPermission('discounts', Permission.DiscountList));
router.get(
  '/discounts/:id',
  checkPermission('discounts', Permission.DiscountList)
);
router.put(
  '/discounts',
  checkPermission('discounts', Permission.DiscountCreateUpdate)
);
router.delete(
  '/discounts/:id',
  checkPermission('discounts', Permission.DiscountCreateUpdate)
);

export default router;
