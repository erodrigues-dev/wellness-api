import { Router } from 'express';

import { Permission } from '../../../shared/models/entities/Permission';
import { checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get('/discounts', checkPermission(Permission.DiscountList));
router.get('/discounts/:id', checkPermission(Permission.DiscountList));
router.post('/discounts', checkPermission(Permission.DiscountCreateUpdate));
router.put('/discounts', checkPermission(Permission.DiscountCreateUpdate));
router.delete('/discounts/:id', checkPermission(Permission.DiscountCreateUpdate));

export default router;
