import { Router } from 'express';

import activity from './Activity';
import activitySchedule from './ActivitySchedule';
import category from './Category';
import checkout from './CheckoutPermission';
import customer from './Customer';
import customerDiscount from './CustomerDiscountPermission';
import employee from './Employee';
import order from './OrderPermission';
import package_ from './Package';
import profile from './Profile';

const router = Router();

router.use(activity);
router.use(activitySchedule);
router.use(customer);
router.use(employee);
router.use(package_);
router.use(profile);
router.use(category);
router.use(customerDiscount);
router.use(order);
router.use(checkout);

export default router;
