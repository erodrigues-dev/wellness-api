import { Router } from 'express';

import { ACTIONS, checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get('/schedules', checkPermission('schedules', ACTIONS.LIST));
router.post('/schedules', checkPermission('schedules', ACTIONS.CREATE));
router.put(
  '/schedules/:id/cancel',
  checkPermission('schedules', ACTIONS.UPDATE)
);

export default router;
