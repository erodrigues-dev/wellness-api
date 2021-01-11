import { Router } from 'express';

import controller from '../controllers/ActivityScheduleController';

const router = Router();

router.get('/activities/:id/schedules', controller.index.bind(controller));
router.get('/activities/:id/schedules/days', controller.days.bind(controller));
router.get(
  '/activities/:id/schedules/days/:day/times',
  controller.times.bind(controller)
);
router.post('/activities/schedules', controller.store.bind(controller));
router.put('/activities/schedules', controller.update.bind(controller));
router.delete('/activities/schedules/:id', controller.delete.bind(controller));

export default router;
