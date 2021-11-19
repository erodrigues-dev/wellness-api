import { Router } from 'express';

import { Permission } from '../../../shared/models/entities/Permission';
import { checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get('/employees', checkPermission(Permission.EmployeeList));
router.get('/employees/:id', checkPermission(Permission.EmployeeList));
router.post('/employees', checkPermission(Permission.EmployeeCreateUpdate));
router.put('/employees', checkPermission(Permission.EmployeeCreateUpdate));
router.delete('/employees/:id', checkPermission(Permission.EmployeeDelete));

export default router;
