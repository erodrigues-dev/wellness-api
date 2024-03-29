import { Router } from 'express';

import activity from './ActivityPermission';
import category from './CategoryPermission';
import checkout from './CheckoutPermission';
import customerDiscount from './CustomerDiscountPermission';
import customer from './CustomerPermission';
import domain from './DomainPermission';
import employee from './EmployeePermission';
import order from './OrderPermission';
import package_ from './PackagePermission';
import profile from './ProfilePermission';
import specialty from './SpecialtyPermission';
import waiver from './WaiverPermission';
import customerWaiver from './CustomerWaiverPermission';
import workout from './WorkoutPermission';

const router = Router();

router.use(activity);
router.use(customer);
router.use(employee);
router.use(package_);
router.use(profile);
router.use(category);
router.use(customerDiscount);
router.use(order);
router.use(checkout);
router.use(domain);
router.use(specialty);
router.use(waiver);
router.use(customerWaiver);
router.use(workout);

export default router;
