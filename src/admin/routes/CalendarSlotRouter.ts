import { Router } from 'express';
import { bindRoute } from '../../shared/utils/bindRoute';

import { makeCalendarSlotController } from '../controllers/CalendaSlotController';

const controller = makeCalendarSlotController();
const router = Router();

router.get('/calendars/:calendarId/slots', bindRoute(controller, 'index'));
// router.get('/calendars/:calendarId/availabilities/:id', bindRoute(controller, 'get'));
router.post('/calendars/:calendarId/slots', bindRoute(controller, 'store'));
// router.put('/calendars/:calendarId/availabilities/:id', bindRoute(controller, 'update'));
// router.delete('/calendars/:calendarId/availabilities/:id', bindRoute(controller, 'destroy'));

export default router;
