import { Router } from 'express';

import session from './Session';
import activity from './Activity';
import customer from './Customer';
import employee from './Employee';

const router = Router();

router.use(session);
router.use(activity);
router.use(customer);
router.use(employee);

export default router;
