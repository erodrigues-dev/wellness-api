import { Router } from 'express';

import activity from './Activity';
import activitySchedule from './ActivitySchedule';
import customer from './Customer';
import employee from './Employee';
import package_ from './Package';
import profile from './Profile';

const router = Router();

router.use(activity);
router.use(activitySchedule);
router.use(customer);
router.use(employee);
router.use(package_);
router.use(profile);

export default router;
