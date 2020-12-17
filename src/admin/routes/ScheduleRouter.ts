import { Router } from 'express';

import controller from '../controllers/ScheduleController';

const router = Router();

router.get('/schedules', controller.index.bind(controller));
router.post('/schedules', controller.store.bind(controller));

export default router;
