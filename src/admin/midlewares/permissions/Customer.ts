import { Router } from 'express';
import { ACTIONS, checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get('/customers', checkPermission('customers', ACTIONS.LIST));
router.get('/customers/:id', checkPermission('customers', ACTIONS.GET, true));
router.put('/customers', checkPermission('customers', ACTIONS.UPDATE));

export default router;
