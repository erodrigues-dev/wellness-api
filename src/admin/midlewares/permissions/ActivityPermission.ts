import { Router } from 'express';

import { Permission } from '../../../shared/models/entities/Permission';
import { checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get('/activities', checkPermission(Permission.ActivityList));
router.get('/activities/:id', checkPermission(Permission.ActivityList));
router.post('/activities', checkPermission(Permission.ActivityCreateUpdate));
router.put('/activities', checkPermission(Permission.ActivityCreateUpdate));

export default router;
