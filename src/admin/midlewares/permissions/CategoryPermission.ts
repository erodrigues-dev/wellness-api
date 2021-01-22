import { Router } from 'express';

import { Permission } from '../../../shared/models/entities/Permission';
import { checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get('/categories', checkPermission(Permission.CategoryList));
router.get('/categories/:id', checkPermission(Permission.CategoryList));
router.post('/categories', checkPermission(Permission.CategoryCreateUpdate));
router.put('/categories', checkPermission(Permission.CategoryCreateUpdate));

export default router;
