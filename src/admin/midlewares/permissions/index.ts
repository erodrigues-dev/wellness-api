import { Router } from 'express';

import activity from './Activity';
import activitySchedule from './ActivitySchedule';
import customer from './Customer';
import employee from './Employee';
import package_ from './Package';
import profile from './Profile';
import customPackage from './CustomPackage';
import category from './Category';
import customerDiscount from './CustomerDiscountPermission';

const router = Router();

router.use(activity);
router.use(activitySchedule);
router.use(customer);
router.use(employee);
router.use(package_);
router.use(profile);
router.use(customPackage);
router.use(category);
router.use(customerDiscount);

export default router;
