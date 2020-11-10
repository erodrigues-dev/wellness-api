import { errors } from 'celebrate';
import { Router } from 'express';

import activityScheduleValidate from './ActivityScheduleValidate';
import activityValidate from './ActivityValidate';
import categoryValidate from './CategoryValidate';
import checkoutValidate from './CheckoutValidate';
import customerDiscountValidate from './CustomerDiscountValidate';
import customerValidate from './CustomerValidate';
import customPackageValidate from './CustomPackageValidate';
import employeeValidate from './EmployeeValidate';
import orderValidate from './OrderValidate';
import packageValidate from './PackageValidate';
import profileValidate from './ProfileValidate';
import sessionValidate from './SessionValidate';

const router = Router();

router.use(sessionValidate);
router.use(activityValidate);
router.use(activityScheduleValidate);
router.use(customerValidate);
router.use(employeeValidate);
router.use(packageValidate);
router.use(profileValidate);
router.use(customPackageValidate);
router.use(categoryValidate);
router.use(customerDiscountValidate);
router.use(orderValidate);
router.use(checkoutValidate);

// required in last position
router.use(errors());

export default router;
