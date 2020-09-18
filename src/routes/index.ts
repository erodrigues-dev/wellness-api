import { Router } from 'express';

import sessionRouter from './SessionRouter';
import activityRouter from './ActivityRouter';
import customerRouter from './CustomerRouter';
import employeeRouter from './EmployeeRouter';
import packageRouter from './PackageRouter';
import session from './Session';
import activity from './Activity';
import customer from './Customer';
import employee from './Employee';
import package_ from './Package';

const router = Router();

router.use(sessionRouter);
router.use(activityRouter);
router.use(customerRouter);
router.use(employeeRouter);
router.use(packageRouter);
router.use(session);
router.use(activity);
router.use(customer);
router.use(employee);
router.use(package_);

export default router;
