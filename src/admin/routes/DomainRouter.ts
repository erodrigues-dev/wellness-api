import { Router } from 'express';

import controller from '../controllers/DomainController';

const router = Router();

router.get(
  '/domain/default-permissions',
  controller.getDefaultPermissions.bind(controller)
);

export default router;
