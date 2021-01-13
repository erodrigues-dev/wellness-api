import { Router } from 'express';
import controller from '../controllers/PackageController';

const router = Router();
router.get('/packages', controller.index.bind(controller));
router.get('/packages/:id', controller.get.bind(controller));
router.post('/packages', controller.store.bind(controller));
router.put('/packages', controller.update.bind(controller));
// router.delete('/packages/:id', controller.destroy.bind(controller))

export default router;
