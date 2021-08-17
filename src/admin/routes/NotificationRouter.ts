import { Router } from 'express';
import { bindRoute } from '../../shared/utils/bindRoute';
import controller from '../controllers/NotificationController';

import { Permission } from '../../shared/models/entities/Permission';
import { checkPermission } from '../../shared/utils/permission';

const router = Router();

router.get('/notifications/by-employee', bindRoute(controller, 'listByEmployee'));
router.put('/notifications/:id/mark-as-read', bindRoute(controller, 'markAsRead'));
router.put('/notifications/:id/mark-as-unread', bindRoute(controller, 'markAsUnread'));
router.put('/notifications/mark-all-as-read', bindRoute(controller, 'markAllAsRead'));
router.put('/notifications/mark-all-as-unread', bindRoute(controller, 'markAllAsUnread'));

router.get('/notifications', checkPermission(Permission.NotificationList), bindRoute(controller, 'index'));
router.get('/notifications/:id', checkPermission(Permission.NotificationList), bindRoute(controller, 'get'));
router.post('/notifications', checkPermission(Permission.NotificationCreateUpdate), bindRoute(controller, 'store'));
router.delete('/notifications/:id', checkPermission(Permission.NotificationDelete), bindRoute(controller, 'destroy'));

export default router;
