import { Router } from 'express';

import { Permission } from '../../../shared/models/entities/Permission';
import { checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get('/profiles', checkPermission('profiles', Permission.ProfileList));
router.get(
  '/profiles/:id',
  checkPermission('profiles', Permission.ProfileList)
);
router.post(
  '/profiles',
  checkPermission('profiles', Permission.ProfileCreateUpdate)
);
router.put(
  '/profiles',
  checkPermission('profiles', Permission.ProfileCreateUpdate)
);

export default router;
