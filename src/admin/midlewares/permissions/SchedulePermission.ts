import { Router } from 'express';

import { Permission } from '../../../shared/models/entities/Permission';
import { checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get('/schedules', checkPermission(Permission.ScheduleList));
router.post('/schedules', checkPermission(Permission.ScheduleBook));
router.put('/schedules/:id/cancel', checkPermission(Permission.ScheduleCancel));

export default router;