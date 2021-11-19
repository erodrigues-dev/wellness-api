import { Router } from 'express';

import { Permission } from '../../../shared/models/entities/Permission';
import { checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.get('/workout-profiles', checkPermission(Permission.WorkoutProfileList));
router.get('/workout-profiles/:id', checkPermission(Permission.WorkoutProfileList));
router.post('/workout-profiles', checkPermission(Permission.WorkoutProfileCreateUpdate));
router.put('/workout-profiles/:id', checkPermission(Permission.WorkoutProfileCreateUpdate));
router.delete('/workout-profiles/:id', checkPermission(Permission.WorkoutProfileDelete));

router.get('/workout-logs', checkPermission(Permission.WorkoutProfileList));
router.get('/workout-logs/:id', checkPermission(Permission.WorkoutProfileList));
router.post('/workout-logs', checkPermission(Permission.WorkoutProfileCreateUpdate));
router.put('/workout-logs/:id', checkPermission(Permission.WorkoutProfileCreateUpdate));
router.delete('/workout-logs/:id', checkPermission(Permission.WorkoutProfileCreateUpdate));

router.get('/workout-exercises', checkPermission(Permission.WorkoutProfileList));
router.get('/workout-exercises/:id', checkPermission(Permission.WorkoutProfileList));
router.post('/workout-exercises', checkPermission(Permission.WorkoutProfileCreateUpdate));
router.put('/workout-exercises/:id', checkPermission(Permission.WorkoutProfileCreateUpdate));
router.delete('/workout-exercises/:id', checkPermission(Permission.WorkoutProfileCreateUpdate));

export default router;
