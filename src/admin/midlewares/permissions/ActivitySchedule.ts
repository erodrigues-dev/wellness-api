import { Router } from 'express';

import { Permission } from '../../../shared/models/entities/Permission';
import { checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get(
  '/activities/:id/schedules',
  checkPermission('activities', Permission.ActivityEvent)
);
router.post(
  '/activities/schedules',
  checkPermission('activities', Permission.ActivityEvent)
);
router.put(
  '/activities/schedules',
  checkPermission('activities', Permission.ActivityEvent)
);

router.delete(
  '/activities/schedules/:id',
  checkPermission('activities', Permission.ActivityEvent)
);

export default router;
