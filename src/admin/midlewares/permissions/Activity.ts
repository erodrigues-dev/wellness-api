import { Router } from 'express';

import { Permission } from '../../../shared/models/entities/Permission';
import { checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get(
  '/activities',
  checkPermission('activities', Permission.ActivityList)
);
router.get(
  '/activities/:id',
  checkPermission('activities', Permission.ActivityList)
);
router.post(
  '/activities',
  checkPermission('activities', Permission.ActivityCreateUpdate)
);
router.put(
  '/activities',
  checkPermission('activities', Permission.ActivityCreateUpdate)
);

export default router;
