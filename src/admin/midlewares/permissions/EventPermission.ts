import { Router } from 'express';

import { Permission } from '../../../shared/models/entities/Permission';
import { checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get(
  '/activities/:id/schedules',
  checkPermission(Permission.ActivityEvent)
);
router.post('/activities/schedules', checkPermission(Permission.ActivityEvent));
router.put('/activities/schedules', checkPermission(Permission.ActivityEvent));

router.delete(
  '/activities/schedules/:id',
  checkPermission(Permission.ActivityEvent)
);

export default router;
