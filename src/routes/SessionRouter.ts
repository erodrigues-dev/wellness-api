import { Router } from 'express';

import controller from '../controllers/SessionController';

const router = Router();

router.post('/sessions', controller.login.bind(controller));

export default router;
