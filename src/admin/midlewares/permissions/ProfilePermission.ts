import { Router } from 'express';

import { Permission } from '../../../shared/models/entities/Permission';
import { checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get('/profiles', checkPermission(Permission.ProfileList));
router.get('/profiles/:id', checkPermission(Permission.ProfileList));
router.post('/profiles', checkPermission(Permission.ProfileCreateUpdate));
router.put('/profiles', checkPermission(Permission.ProfileCreateUpdate));

export default router;
