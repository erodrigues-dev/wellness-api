import { Router } from 'express';
import { ACTIONS, checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get('/packages', checkPermission('packages', ACTIONS.LIST));
router.get('/packages/:id', checkPermission('packages', ACTIONS.LIST));
router.post('/packages', checkPermission('packages', ACTIONS.CREATE));
router.put('/packages', checkPermission('packages', ACTIONS.UPDATE));

export default router;
