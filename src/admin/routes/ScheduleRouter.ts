import { Router } from 'express';

import controller from '../controllers/ScheduleController';

const router = Router();

router.get('/schedules', controller.index.bind(controller));
router.post('/schedules', controller.store.bind(controller));
router.put('/schedules/:id/cancel', controller.cancel.bind(controller));

export default router;
