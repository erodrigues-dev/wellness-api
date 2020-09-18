import { Router } from 'express';
import controller from '../controllers/ActivityController';

const router = Router();

router.get('/activities', controller.index.bind(controller));
router.get('/activities/:id', controller.get.bind(controller));
router.post('/activities', controller.store.bind(controller));
router.put('/activities', controller.update.bind(controller));

export default router;
