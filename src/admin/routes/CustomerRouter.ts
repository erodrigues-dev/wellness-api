import { Router } from 'express';

import controller from '../controllers/CustomerController';

const router = Router();

router.get('/customers', controller.index.bind(controller));
router.get('/customers/:id', controller.get.bind(controller));
router.get('/customers/:id/activities', controller.getActivities.bind(controller));
router.post('/customers', controller.store.bind(controller));
router.put('/customers', controller.update.bind(controller));
router.delete('/customers/:id', controller.delete.bind(controller));

export default router;
