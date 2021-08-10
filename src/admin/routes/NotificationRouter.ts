import { Router } from 'express';
import controller from '../controllers/NotificationController';

const router = Router();

router.get('/notifications', controller.index.bind(controller));
router.get('/notifications/:id', controller.get.bind(controller));
router.post('/notifications', controller.store.bind(controller));
router.delete('/notifications/:id', controller.destroy.bind(controller));
router.put('/notifications/mark-all-as-read', controller.markAllAsRead.bind(controller));
router.put('/notifications/:id/mark-as-read', controller.markAsRead.bind(controller));

export default router;
