import { Router } from 'express';

import { SigninController, SignupController } from '../controllers';

const router = Router();

router.post('/sessions/signin', new SigninController().handle);
router.post('/sessions/signup', new SignupController().handle);

export default router;
