import { Router } from 'express';

import { Permission } from '../../../shared/models/entities/Permission';
import { checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get('/specialties', checkPermission(Permission.SpecialtyList));
router.get('/specialties/:id', checkPermission(Permission.SpecialtyList));
router.post('/specialties', checkPermission(Permission.SpecialtyCreateUpdate));
router.put('/specialties', checkPermission(Permission.SpecialtyCreateUpdate));
router.delete('/specialties/:id', checkPermission(Permission.SpecialtyDelete));

export default router;
