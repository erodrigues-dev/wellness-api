import { Router } from 'express';
import { bindRoute } from '../../shared/utils/bindRoute';

import { makeCalendarAvailabilityController } from '../controllers/CalendaAvailabilityController';

const controller = makeCalendarAvailabilityController();
const router = Router();

router.get('/calendars/:calendarId/availabilities', bindRoute(controller, 'index'));
router.get('/calendars/:calendarId/availabilities/:id', bindRoute(controller, 'get'));
router.post('/calendars/:calendarId/availabilities', bindRoute(controller, 'store'));
router.put('/calendars/:calendarId/availabilities/:id', bindRoute(controller, 'update'));
router.delete('/calendars/:calendarId/availabilities/:id', bindRoute(controller, 'destroy'));

export default router;
