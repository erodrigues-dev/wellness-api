import { Router } from 'express';

import { Permission } from '../../../shared/models/entities/Permission';
import { checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get('/packages', checkPermission('packages', Permission.PackageList));
router.get(
  '/packages/:id',
  checkPermission('packages', Permission.PackageList)
);
router.post(
  '/packages',
  checkPermission('packages', Permission.PackageCreateUpdate)
);
router.put(
  '/packages',
  checkPermission('packages', Permission.PackageCreateUpdate)
);

export default router;
