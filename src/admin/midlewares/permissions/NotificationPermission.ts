import { Router } from 'express';

import { Permission } from '../../../shared/models/entities/Permission';
import { checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get('/notifications', checkPermission(Permission.NotificationList));
router.get('/notifications/:id', checkPermission(Permission.NotificationList));
router.post('/notifications', checkPermission(Permission.NotificationCreateUpdate));
router.delete('/notifications/:id', checkPermission(Permission.NotificationDelete));

router.put('/notifications/mark-all-as-read', checkPermission(Permission.NotificationCreateUpdate));
router.put('/notifications/:id/mark-as-read', checkPermission(Permission.NotificationCreateUpdate));

export default router;
