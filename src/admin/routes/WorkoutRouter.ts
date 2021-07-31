import { Router } from 'express';

import { bindRoute } from '../../shared/utils/bindRoute';
import { makeWorkoutProfileController } from '../controllers/WorkoutProfileController';
import { makeWorkoutLogController } from '../controllers/WorkoutLogController';
import { makeWorkoutExerciseController } from '../controllers/WorkoutExerciseController';

const router = Router();
const workoutProfileController = makeWorkoutProfileController();
const workoutLogController = makeWorkoutLogController();
const workoutExerciseController = makeWorkoutExerciseController();

router.get('/workout-profiles', bindRoute(workoutProfileController, 'index'));
router.get('/workout-profiles/:id', bindRoute(workoutProfileController, 'get'));
router.post('/workout-profiles', bindRoute(workoutProfileController, 'store'));
router.put('/workout-profiles/:id', bindRoute(workoutProfileController, 'update'));
router.delete('/workout-profiles/:id', bindRoute(workoutProfileController, 'destroy'));

router.get('/workout-logs', bindRoute(workoutLogController, 'index'));
router.get('/workout-logs/:id', bindRoute(workoutLogController, 'get'));
router.post('/workout-logs', bindRoute(workoutLogController, 'store'));
router.put('/workout-logs/:id', bindRoute(workoutLogController, 'update'));
router.delete('/workout-logs/:id', bindRoute(workoutLogController, 'destroy'));

router.get('/workout-exercises', bindRoute(workoutExerciseController, 'index'));
router.get('/workout-exercises/:id', bindRoute(workoutExerciseController, 'get'));
router.post('/workout-exercises', bindRoute(workoutExerciseController, 'store'));
router.put('/workout-exercises/:id', bindRoute(workoutExerciseController, 'update'));
router.delete('/workout-exercises/:id', bindRoute(workoutExerciseController, 'destroy'));

export default router;
