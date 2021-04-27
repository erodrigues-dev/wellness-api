import { Router } from 'express';

import { Permission } from '../../../shared/models/entities/Permission';
import { checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get('/waivers', checkPermission(Permission.WaiverList));
router.get('/waivers/:id', checkPermission(Permission.WaiverList));
router.post('/waivers', checkPermission(Permission.WaiverCreateUpdate));
router.put('/waivers', checkPermission(Permission.WaiverCreateUpdate));
router.delete('/waivers/:id', checkPermission(Permission.WaiverDelete));

export default router;
