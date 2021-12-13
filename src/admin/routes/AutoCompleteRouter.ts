import { Router } from 'express';
import { bindRoute } from '../../shared/utils/bindRoute';

import { makeAutoCompleteController } from '../controllers/AutoCompleteController';

const controller = makeAutoCompleteController();
const router = Router();

router.get('/autocomplete/customers', bindRoute(controller, 'customers'));

export default router;
