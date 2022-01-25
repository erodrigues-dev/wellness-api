import { Router } from 'express';
import { bindRoute } from '../../shared/utils/bindRoute';

import { Permission } from '../../shared/models/entities/Permission';
import { checkPermission } from '../../shared/utils/permission';

import { makeCalendarController } from '../controllers/CalendarController';
import { makeCalendarEntryController } from '../controllers/CalendarEntryController';

const calendarController = makeCalendarController();
const entryController = makeCalendarEntryController();

const router = Router();

router.get('/calendars', checkPermission(Permission.CalendarList), bindRoute(calendarController, 'index'));
router.get('/calendars/:id', checkPermission(Permission.CalendarList), bindRoute(calendarController, 'get'));
router.post('/calendars', checkPermission(Permission.CalendarCreateUpdate), bindRoute(calendarController, 'store'));
router.put('/calendars/:id', checkPermission(Permission.CalendarCreateUpdate), bindRoute(calendarController, 'update'));
router.delete('/calendars/:id', checkPermission(Permission.CalendarDelete), bindRoute(calendarController, 'destroy'));

router.get('/calendars/scheduler/entries', bindRoute(entryController, 'schedulerData'));
router.get('/calendars/:calendarId/entries', bindRoute(entryController, 'index'));
router.post('/calendars/:calendarId/entries', bindRoute(entryController, 'store'));
router.put('/calendars/:calendarId/entries/:id', bindRoute(entryController, 'update'));

export default router;
