import { Router } from 'express';

import { Permission } from '../../../shared/models/entities/Permission';
import { checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get('/orders', checkPermission(Permission.OrderList));
router.put('/orders/:id/cancel', checkPermission(Permission.OrderCancel));

export default router;
