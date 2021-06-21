import { Router } from 'express';

import { bindRoute } from '../../shared/utils/bindRoute';
import { makeWorkoutProfileController } from '../controllers/WorkoutProfileController';

const router = Router();
const workoutProfileController = makeWorkoutProfileController();

router.post('/workout-profiles', bindRoute(workoutProfileController, 'store'));

export default router;
