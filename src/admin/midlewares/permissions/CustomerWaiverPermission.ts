import { Router } from 'express';

import { Permission } from '../../../shared/models/entities/Permission';
import { checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get('/customers/:customerId/waivers', checkPermission(Permission.WaiverList));
router.post('/customers/:customerId/waivers', checkPermission(Permission.WaiverCreateUpdate));
router.put('/customers/:customerId/waivers', checkPermission(Permission.WaiverCreateUpdate));
router.delete('/customers/:customerId/waivers/:waiverId', checkPermission(Permission.WaiverDelete));

export default router;
