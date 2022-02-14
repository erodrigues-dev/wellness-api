import { Router } from 'express';
import { bindRoute } from '../../shared/utils/bindRoute';
import { makeSchedulerController } from '../controllers/SchedulerController';

const controller = makeSchedulerController();
const router = Router();

router.get('/scheduler/calendars', bindRoute(controller, 'calendars'));
router.get('/scheduler/calendars/:id/activities', bindRoute(controller, 'activities'));
router.get('/scheduler/slots', bindRoute(controller, 'slots'));

router.get('/scheduler/items', bindRoute(controller, 'listItems'));
router.get('/scheduler/items/:id', bindRoute(controller, 'getItem'));
router.post('/scheduler/items', bindRoute(controller, 'addItem'));
router.put('/scheduler/items/:id', bindRoute(controller, 'updateItem'));
router.post('/scheduler/items/:id/cancel', bindRoute(controller, 'cancelItem'));

export default router;
