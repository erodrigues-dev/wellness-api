import { Router } from 'express';

import { ACTIONS, checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get(
  '/activities/:id/schedules',
  checkPermission('activities', ACTIONS.LIST)
);
router.post(
  '/activities/schedules',
  checkPermission('activities', ACTIONS.CREATE)
);
router.put(
  '/activities/schedules',
  checkPermission('activities', ACTIONS.UPDATE)
);

router.delete(
  '/activities/schedules/:id',
  checkPermission('activities', ACTIONS.UPDATE)
);

export default router;
