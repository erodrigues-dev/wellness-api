import { Router } from 'express';

import { Permission } from '../../../shared/models/entities/Permission';
import { checkPermission } from '../../../shared/utils/permission';

const router = Router();

router.use('/workout-profiles', checkPermission(Permission.WorkoutProfileList));

router.delete('/workout-profiles/:id', checkPermission(Permission.WorkoutProfileDelete));

router.post('/workout-profiles/?*', checkPermission(Permission.WorkoutProfileCreateUpdate));
router.put('/workout-profiles/?*', checkPermission(Permission.WorkoutProfileCreateUpdate));
router.delete('/workout-profiles/?*', checkPermission(Permission.WorkoutProfileCreateUpdate));

export default router;
