import { Router } from 'express';
import { bindRoute } from '../../shared/utils/bindRoute';

import { makeCalendarLabelController } from '../controllers/CalendarLabelController';

const controller = makeCalendarLabelController();
const router = Router();

router.get('/calendar-labels', bindRoute(controller, 'index'));
router.post('/calendar-labels', bindRoute(controller, 'store'));
router.put('/calendar-labels/:id', bindRoute(controller, 'update'));
router.delete('/calendar-labels/:id', bindRoute(controller, 'destroy'));

export default router;
