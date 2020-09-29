import { Router } from 'express';

import { ACTIONS, checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get('/categories', checkPermission('categories', ACTIONS.LIST));
router.get('/categories/:id', checkPermission('categories', ACTIONS.LIST));
router.post('/categories', checkPermission('categories', ACTIONS.CREATE));
router.put('/categories', checkPermission('categories', ACTIONS.UPDATE));

export default router;
