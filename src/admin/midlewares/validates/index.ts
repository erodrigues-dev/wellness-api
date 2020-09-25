import { errors } from 'celebrate';
import { Router } from 'express';

import sessionValidate from './SessionValidate';
import activityValidate from './ActivityValidate';
import activityScheduleValidate from './ActivityScheduleValidate';
import customerValidate from './CustomerValidate';
import employeeValidate from './EmployeeValidate';
import packageValidate from './PackageValidate';
import profileValidate from './ProfileValidate';
import customPackageValidate from './CustomPackageValidate';

const router = Router();

router.use(sessionValidate);
router.use(activityValidate);
router.use(activityScheduleValidate);
router.use(customerValidate);
router.use(employeeValidate);
router.use(packageValidate);
router.use(profileValidate);
router.use(customPackageValidate);

// required in last position
router.use(errors());

export default router;
