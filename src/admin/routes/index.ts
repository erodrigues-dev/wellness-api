import { Router } from 'express';

import activityRouter from './ActivityRouter';
import activityScheduleRouter from './ActivityScheduleRouter';
import categoryRouter from './CategoryRouter';
import checkoutRouter from './CheckoutRouter';
import customerDiscountRouter from './CustomerDiscountRouter';
import customerRouter from './CustomerRouter';
import customPackageRouter from './CustomPackageRouter';
import employeeRouter from './EmployeeRouter';
import orderRouter from './OrderRouter';
import packageRouter from './PackageRouter';
import profileRouter from './ProfileRouter';
import scheduleRouter from './ScheduleRouter';
import sessionRouter from './SessionRouter';

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
router.use(checkoutRouter);
router.use(scheduleRouter);

export default router;
