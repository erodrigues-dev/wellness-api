import { Router } from 'express';

import session from './Session';
import activity from './Activity';
import customer from './Customer';

const router = Router();

//TODO
//- permissions
//- uploads
//- validates
//- controllers
//- routes

router.use(session);
router.use(activity);
router.use(customer);

export default router;
