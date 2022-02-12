import { Router } from 'express';

import activityValidate from './ActivityValidate';
import categoryValidate from './CategoryValidate';
import checkoutValidate from './CheckoutValidate';
import customerDiscountValidate from './CustomerDiscountValidate';
import customerValidate from './CustomerValidate';
import employeeValidate from './EmployeeValidate';
import orderValidate from './OrderValidate';
import packageValidate from './PackageValidate';
import profileValidate from './ProfileValidate';
import sessionValidate from './SessionValidate';
import specialtyValidate from './SpecialtyValidate';

const router = Router();

router.use(sessionValidate);
router.use(activityValidate);
router.use(customerValidate);
router.use(employeeValidate);
router.use(packageValidate);
router.use(profileValidate);
router.use(categoryValidate);
router.use(customerDiscountValidate);
router.use(orderValidate);
router.use(checkoutValidate);
router.use(specialtyValidate);

export default router;
