import { Router } from 'express';

import activityValidate from './ActivityValidate';
import categoryValidate from './CategoryValidate';
import checkoutValidate from './CheckoutValidate';
import customerDiscountValidate from './CustomerDiscountValidate';
import customerValidate from './CustomerValidate';
import employeeValidate from './EmployeeValidate';
import eventValidate from './EventValidate';
import orderValidate from './OrderValidate';
import packageValidate from './PackageValidate';
import profileValidate from './ProfileValidate';
import scheduleValidate from './ScheduleValidate';
import sessionValidate from './SessionValidate';

const router = Router();

router.use(sessionValidate);
router.use(activityValidate);
router.use(eventValidate);
router.use(customerValidate);
router.use(employeeValidate);
router.use(packageValidate);
router.use(profileValidate);
router.use(categoryValidate);
router.use(customerDiscountValidate);
router.use(orderValidate);
router.use(checkoutValidate);
router.use(scheduleValidate);

export default router;
