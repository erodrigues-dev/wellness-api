import { Router } from 'express';

import controller from '../controllers/SessionController';

const router = Router();

router.post('/sessions', controller.login.bind(controller));
router.post(
  '/sessions/recover-password',
  controller.recoverPassword.bind(controller)
);
router.put('/sessions', controller.update.bind(controller));
router.get('/sessions', controller.permissions.bind(controller));

export default router;
