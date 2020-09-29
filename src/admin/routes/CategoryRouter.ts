import { Router } from 'express';
import controller from '../controllers/CategoryController';

const router = Router();

router.get('/categories', controller.index.bind(controller));
router.get('/categories/:id', controller.get.bind(controller));
router.post('/categories', controller.store.bind(controller));
router.put('/categories', controller.update.bind(controller));

export default router;
