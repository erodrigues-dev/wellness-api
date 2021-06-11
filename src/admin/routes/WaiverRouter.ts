import { Router } from 'express';

import controller from '../controllers/WaiverController';

const router = Router();

router.get('/waivers', controller.index.bind(controller));
router.get('/waivers/all', controller.listAll.bind(controller));
router.get('/waivers/:id', controller.get.bind(controller));
router.post('/waivers', controller.create.bind(controller));
router.put('/waivers', controller.update.bind(controller));
router.delete('/waivers/:id', controller.destroy.bind(controller));

export default router;
