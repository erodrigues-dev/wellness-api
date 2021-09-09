import { Router } from 'express';

import { Permission } from '../../../shared/models/entities/Permission';
import { checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get('/packages', checkPermission(Permission.PackageList));
router.get('/packages/:id', checkPermission(Permission.PackageList));
router.post('/packages', checkPermission(Permission.PackageCreateUpdate));
router.put('/packages', checkPermission(Permission.PackageCreateUpdate));
router.delete('/packages', checkPermission(Permission.PackageDelete));

export default router;
