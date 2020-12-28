import { Router } from 'express';

import { ACTIONS, checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get('/schedules', checkPermission('schedules', ACTIONS.LIST));
router.post('/schedules', checkPermission('schedules', ACTIONS.CREATE));

export default router;
