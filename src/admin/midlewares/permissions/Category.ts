import { Router } from 'express';

import { Permission } from '../../../shared/models/entities/Permission';
import { checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get(
  '/categories',
  checkPermission('categories', Permission.CategoryList)
);
router.get(
  '/categories/:id',
  checkPermission('categories', Permission.CategoryList)
);
router.post(
  '/categories',
  checkPermission('categories', Permission.CategoryCreateUpdate)
);
router.put(
  '/categories',
  checkPermission('categories', Permission.CategoryCreateUpdate)
);

export default router;
