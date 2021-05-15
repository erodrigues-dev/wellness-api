import { Router } from 'express';

import activity from './Activity';
import customer from './Customer';
import employee from './Employee';
import package_ from './Package';
import session from './Session';
import customerWaiver from './CustomerWaiver';

const router = Router();

router.use(activity);
router.use(customer);
router.use(employee);
router.use(package_);
router.use(session);
router.use(customerWaiver);

export default router;
