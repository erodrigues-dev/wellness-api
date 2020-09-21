import { Router } from 'express';
import { ACTIONS, checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.post('/packages', checkPermission('packages', ACTIONS.CREATE));
router.put('/packages', checkPermission('packages', ACTIONS.UPDATE));

export default router;
