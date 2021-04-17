import { Router } from 'express';

import controller from '../controllers/EmployeeController';

const router = Router();

router.get('/employees', controller.index.bind(controller));
router.get('/employees/:id', controller.get.bind(controller));
router.post('/employees', controller.store.bind(controller));
router.put('/employees', controller.update.bind(controller));
router.delete('/employees/:id', controller.destroy.bind(controller));

export default router;
