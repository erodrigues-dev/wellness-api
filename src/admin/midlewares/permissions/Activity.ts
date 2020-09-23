import { Router } from 'express';

import { ACTIONS, checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get('/activities', checkPermission('activities', ACTIONS.LIST));
router.get('/activities/:id', checkPermission('activities', ACTIONS.LIST));
router.post('/activities', checkPermission('activities', ACTIONS.CREATE));
router.put('/activities', checkPermission('activities', ACTIONS.UPDATE));

export default router;
