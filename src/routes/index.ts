import { Router } from 'express';

import sessionRouter from './SessionRouter';
import activityRouter from './ActivityRouter';
import customerRouter from './CustomerRouter';
import employeeRouter from './EmployeeRouter';
import packageRouter from './PackageRouter';
import profileRouter from './ProfileRouter';

const router = Router();

router.use(sessionRouter);
router.use(activityRouter);
router.use(customerRouter);
router.use(employeeRouter);
router.use(packageRouter);
router.use(profileRouter);

export default router;
