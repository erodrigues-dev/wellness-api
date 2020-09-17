import { Router } from 'express';

import controller from '../controllers/CustomerController';

const router = Router();

router.get('/customers', controller.index.bind(controller));
router.get('/customers/:id', controller.get.bind(controller));
router.post('/customers', controller.store.bind(controller));
router.put('/customers', controller.update.bind(controller));

export default router;
