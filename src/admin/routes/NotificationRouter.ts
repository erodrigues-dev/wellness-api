import { Router } from 'express';
import { bindRoute } from '../../shared/utils/bindRoute';
import controller from '../controllers/NotificationController';

const router = Router();

router.get('/notifications/unreads', bindRoute(controller, 'listUnread'));
router.put('/notifications/:id/mark-as-read', bindRoute(controller, 'markAsRead'));
router.put('/notifications/:id/mark-as-unread', bindRoute(controller, 'markAsUnread'));
router.put('/notifications/mark-all-as-read', bindRoute(controller, 'markAllAsRead'));

router.get('/notifications', bindRoute(controller, 'index'));
router.get('/notifications/:id', bindRoute(controller, 'get'));
router.post('/notifications', bindRoute(controller, 'store'));
router.delete('/notifications/:id', bindRoute(controller, 'destroy'));

export default router;
