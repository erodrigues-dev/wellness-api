import { Router } from 'express';

import { signatureValidate } from './signature-validate';

const router = Router();

router.use(
  '/subscription',
  signatureValidate('subscription', process.env.SQUARE_WEBHOOK_SUBSCRIPTION_KEY)
);
router.use(
  '/invoice',
  signatureValidate('invoice', process.env.SQUARE_WEBHOOK_INVOICE_KEY)
);

export default router;
