import { Router } from 'express';

import { makeCustomerWaiverController } from '../controllers/CustomerWaiverController';

const controller = makeCustomerWaiverController();
const router = Router();

router.get('/customers/:id/waivers', controller.list.bind(controller));
router.post('/customers/:customerId/waivers/:waiverId', controller.create.bind(controller));

export default router;
