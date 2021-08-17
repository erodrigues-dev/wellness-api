import { Router } from 'express';
import { bindRoute } from '../../shared/utils/bindRoute';

import controller from '../controllers/EmployeeController';

const router = Router();

router.get('/employees', bindRoute(controller, 'index'));
router.get('/employees/:id', bindRoute(controller, 'get'));
router.post('/employees', bindRoute(controller, 'store'));
router.put('/employees', bindRoute(controller, 'update'));
router.delete('/employees/:id', bindRoute(controller, 'destroy'));

export default router;
