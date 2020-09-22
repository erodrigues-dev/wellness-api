import { Router } from 'express';

import controller from '../controllers/ActivityScheduleController';

const router = Router();

router.get('/activities-schedules', controller.index.bind(controller));
router.post('/activities-schedules', controller.store.bind(controller));
router.put('/activities-schedules', controller.update.bind(controller));
router.delete('/activities-schedules/:id', controller.delete.bind(controller));

export default router;
