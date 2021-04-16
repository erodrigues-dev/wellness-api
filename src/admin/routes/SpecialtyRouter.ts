import { Router } from 'express';

import controller from '../controllers/SpecialtyController';

const router = Router();

router.get('/specialties', controller.list.bind(controller));
router.get('/specialties/:id', controller.get.bind(controller));
router.post('/specialties', controller.create.bind(controller));
router.put('/specialties', controller.update.bind(controller));
router.delete('/specialties/:id', controller.destroy.bind(controller));

export default router;
