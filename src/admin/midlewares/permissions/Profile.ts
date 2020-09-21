import { Router } from 'express';
import { ACTIONS, checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get('/profiles', checkPermission('profiles', ACTIONS.LIST));
router.get('/profiles/:id', checkPermission('profiles', ACTIONS.GET));
router.post('/profiles', checkPermission('profiles', ACTIONS.CREATE));
router.put('/profiles', checkPermission('profiles', ACTIONS.UPDATE));

export default router;
