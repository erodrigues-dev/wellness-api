import { Router } from 'express';

import { Permission } from '../../../shared/models/entities/Permission';
import { checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get('/customers', checkPermission('customers', Permission.CustomerList));
router.get(
  '/customers/:id',
  checkPermission('customers', Permission.CustomerList)
);
router.put(
  '/customers',
  checkPermission('customers', Permission.CustomerCreateUpdate)
);

export default router;
