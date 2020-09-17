import { Router } from 'express';

import controller from '../controllers/Session';

const router = Router();

router.post('/sessions', controller.login.bind(controller));

export default router;
