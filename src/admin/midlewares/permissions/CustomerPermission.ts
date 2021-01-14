import { Router } from 'express';

import { Permission } from '../../../shared/models/entities/Permission';
import { checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get('/customers', checkPermission(Permission.CustomerList));
router.get('/customers/:id', checkPermission(Permission.CustomerList));
router.put('/customers', checkPermission(Permission.CustomerCreateUpdate));

export default router;
