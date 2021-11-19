import { Router } from 'express';

import permissions from './permissions';
import uploads from './uploads';
import validates from './validates';

const router = Router();

router.use(permissions);
router.use(uploads);
router.use(validates);

export default router;
