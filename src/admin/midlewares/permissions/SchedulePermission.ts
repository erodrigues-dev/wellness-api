import { Router } from 'express';

import { Permission } from '../../../shared/models/entities/Permission';
import { checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get('/schedules', checkPermission('schedules', Permission.ScheduleList));
router.post(
  '/schedules',
  checkPermission('schedules', Permission.ScheduleBook)
);
router.put(
  '/schedules/:id/cancel',
  checkPermission('schedules', Permission.ScheduleCancel)
);

export default router;
