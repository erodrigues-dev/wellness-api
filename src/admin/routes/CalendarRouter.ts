import { Router } from 'express';
import { bindRoute } from '../../shared/utils/bindRoute';

import { makeCalendarController } from '../controllers/CalendarController';

const controller = makeCalendarController();
const router = Router();

router.get('/calendars', bindRoute(controller, 'index'));
router.get('/calendars/:id', bindRoute(controller, 'get'));
router.post('/calendars', bindRoute(controller, 'store'));
router.put('/calendars', bindRoute(controller, 'update'));
router.delete('/calendars/:id', bindRoute(controller, 'destroy'));

export default router;
