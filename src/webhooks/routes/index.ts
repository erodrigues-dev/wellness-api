import { Router } from 'express';

import { InvoiceController } from '../controllers/InvoiceController';
import { SubscriptionController } from '../controllers/SubscriptionController';

const router = Router();
const subscriptionController = new SubscriptionController();
const invoiceController = new InvoiceController();

router.post('/subscription', (req, res, next) =>
  subscriptionController.receive(req, res, next)
);

router.post('/invoice', (req, res, next) =>
  invoiceController.receive(req, res, next)
);

export default router;
