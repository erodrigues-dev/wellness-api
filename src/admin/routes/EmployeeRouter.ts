import { Router } from 'express';
import { bindRoute } from '../../shared/utils/bindRoute';

import controller from '../controllers/EmployeeController';
import notificationController from '../controllers/NotificationController';

const router = Router();

router.get('/employees/notifications', bindRoute(notificationController, 'listByEmployee'));
router.put('/employees/notifications/:id/mark-as-read', bindRoute(notificationController, 'markAsRead'));
router.put('/employees/notifications/:id/mark-as-unread', bindRoute(notificationController, 'markAsUnread'));
router.put('/employees/notifications/mark-all-as-read', bindRoute(notificationController, 'markAllAsRead'));
router.put('/employees/notifications/mark-all-as-unread', bindRoute(notificationController, 'markAllAsUnread'));

router.get('/employees', bindRoute(controller, 'index'));
router.get('/employees/:id', bindRoute(controller, 'get'));
router.post('/employees', bindRoute(controller, 'store'));
router.put('/employees', bindRoute(controller, 'update'));
router.delete('/employees/:id', bindRoute(controller, 'destroy'));

export default router;
