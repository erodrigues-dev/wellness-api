import { Router } from 'express';

import sessionRouter from './SessionRouter';
import activityRouter from './ActivityRouter';
import activityScheduleRouter from './ActivityScheduleRouter';
import customerRouter from './CustomerRouter';
import employeeRouter from './EmployeeRouter';
import packageRouter from './PackageRouter';
import profileRouter from './ProfileRouter';
import customPackageRouter from './CustomPackageRouter';
import categoryRouter from './CategoryRouter';
import customerDiscountRouter from './CustomerDiscountRouter';
import orderRouter from './OrderRouter';

const router = Router();

router.use(sessionRouter);
router.use(activityRouter);
router.use(activityScheduleRouter);
router.use(customerRouter);
router.use(employeeRouter);
router.use(packageRouter);
router.use(profileRouter);
router.use(customPackageRouter);
router.use(categoryRouter);
router.use(customerDiscountRouter);
router.use(orderRouter);

export default router;
