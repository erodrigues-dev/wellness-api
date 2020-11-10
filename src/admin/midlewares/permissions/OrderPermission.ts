import { Router } from 'express';

import { ACTIONS, checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get('/orders', checkPermission('orders', ACTIONS.CREATE));

export default router;
