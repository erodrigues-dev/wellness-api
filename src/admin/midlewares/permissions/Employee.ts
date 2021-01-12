import { Router } from 'express';

import { Permission } from '../../../shared/models/entities/Permission';
import { checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get('/employees', checkPermission('employees', Permission.EmployeeList));
router.get(
  '/employees/:id',
  checkPermission('employees', Permission.EmployeeList)
);
router.post(
  '/employees',
  checkPermission('employees', Permission.EmployeeCreateUpdate)
);
router.put(
  '/employees',
  checkPermission('employees', Permission.EmployeeCreateUpdate)
);

export default router;
