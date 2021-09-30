import { Router } from 'express';
import { bindRoute } from '../../shared/utils/bindRoute';

import { Permission } from '../../shared/models/entities/Permission';
import { checkPermission } from '../../shared/utils/permission';

import { makeCalendarController } from '../controllers/CalendarController';

const controller = makeCalendarController();
const router = Router();

router.get('/calendars', checkPermission(Permission.CalendarList), bindRoute(controller, 'index'));
router.get('/calendars/:id', checkPermission(Permission.CalendarList), bindRoute(controller, 'get'));
router.post('/calendars', checkPermission(Permission.CalendarCreateUpdate), bindRoute(controller, 'store'));
router.put('/calendars/:id', checkPermission(Permission.CalendarCreateUpdate), bindRoute(controller, 'update'));
router.delete('/calendars/:id', checkPermission(Permission.CalendarDelete), bindRoute(controller, 'destroy'));

export default router;
