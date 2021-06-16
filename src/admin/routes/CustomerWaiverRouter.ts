import { Router } from 'express';

import { makeCustomerWaiverController } from '../controllers/CustomerWaiverController';

const controller = makeCustomerWaiverController();
const router = Router();

router.get('/customers/:customerId/waivers', controller.list.bind(controller));
router.get('/customers/:customerId/waivers/:waiverId', controller.detail.bind(controller));
router.get('/customers/:customerId/waivers/activity/:activityId', controller.detailByActivity.bind(controller));
router.post('/customers/:customerId/waivers', controller.add.bind(controller));
router.put('/customers/:customerId/waivers', controller.sign.bind(controller));
router.delete('/customers/:customerId/waivers/:waiverId', controller.delete.bind(controller));

export default router;
