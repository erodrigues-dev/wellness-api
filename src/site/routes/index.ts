import { Router } from 'express';

import { SigninController } from '../controllers';

const router = Router();

router.post('/sessions', (req, res, next) =>
  new SigninController().handle(req, res, next)
);

export default router;
