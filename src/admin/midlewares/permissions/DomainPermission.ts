import { Router } from 'express';

import { Permission } from '../../../shared/models/entities/Permission';
import { checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get(
  '/domain/default-permissions',
  checkPermission(Permission.ProfileCreateUpdate)
);

export default router;
