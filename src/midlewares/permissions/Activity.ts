import { Router } from 'express';

import { ACTIONS, checkPermission } from '../../shared/utils/permission';

const router = Router();

router.post('/activities', checkPermission('activities', ACTIONS.CREATE));
router.put('/activities', checkPermission('activities', ACTIONS.UPDATE));

export default router;
