import { errors } from 'celebrate';
import { Router } from 'express';

import sessionValidate from './Session';
import activityValidate from './Activity';
import activityScheduleValidate from './ActivitySchedule';
import customerValidate from './Customer';
import employeeValidate from './Employee';
import packageValidate from './Package';
import profileValidate from './Profile';

const router = Router();

router.use(sessionValidate);
router.use(activityValidate);
router.use(activityScheduleValidate);
router.use(customerValidate);
router.use(employeeValidate);
router.use(packageValidate);
router.use(profileValidate);

// required in last position
router.use(errors());

export default router;
