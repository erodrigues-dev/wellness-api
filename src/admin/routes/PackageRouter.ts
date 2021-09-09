import { Router } from 'express';
import { bindRoute } from '../../shared/utils/bindRoute';
import controller from '../controllers/PackageController';

const router = Router();
router.get('/packages', bindRoute(controller, 'index'));
router.get('/packages/:id', bindRoute(controller, 'get'));
router.post('/packages', bindRoute(controller, 'store'));
router.put('/packages', bindRoute(controller, 'update'));
router.delete('/packages/:id', bindRoute(controller, 'destroy'));

export default router;
