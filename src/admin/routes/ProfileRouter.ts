import { Router } from 'express';

import controller from '../controllers/ProfileController';

const router = Router();

router.get('/profiles', controller.index.bind(controller));
router.get('/profiles/:id', controller.get.bind(controller));
router.post('/profiles', controller.store.bind(controller));
router.put('/profiles', controller.update.bind(controller));

export default router;
