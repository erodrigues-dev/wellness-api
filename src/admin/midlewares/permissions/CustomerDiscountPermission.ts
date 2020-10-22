import { Router } from 'express';
import { ACTIONS, checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get('/discounts', checkPermission('discounts', ACTIONS.LIST));
router.get('/discounts/:id', checkPermission('discounts', ACTIONS.GET));
router.put('/discounts', checkPermission('discounts', ACTIONS.UPDATE));
router.delete('/discounts/:id', checkPermission('discounts', ACTIONS.UPDATE));

export default router;
