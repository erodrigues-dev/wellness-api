import { Router } from 'express';

import { bindRoute } from '../../shared/utils/bindRoute';
import { makeWorkoutProfileController } from '../controllers/WorkoutProfileController';
import { makeWorkoutLogController } from '../controllers/WorkoutLogController';

const router = Router();
const workoutProfileController = makeWorkoutProfileController();
const workoutLogController = makeWorkoutLogController();

router.post('/workout-profiles', bindRoute(workoutProfileController, 'store'));
router.put('/workout-profiles/:id', bindRoute(workoutProfileController, 'update'));

router.post('/workout-profiles/:workoutProfileId/logs', bindRoute(workoutLogController, 'store'));
router.put('/workout-profiles/:workoutProfileId/logs/:id', bindRoute(workoutLogController, 'update'));

export default router;
