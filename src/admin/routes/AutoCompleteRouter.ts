import { Router } from 'express';
import { bindRoute } from '../../shared/utils/bindRoute';

import { makeAutoCompleteController } from '../controllers/AutoCompleteController';

const controller = makeAutoCompleteController();
const router = Router();

router.get('/autocomplete/customers', bindRoute(controller, 'customers'));
router.get('/autocomplete/team-groups', bindRoute(controller, 'teamGroups'));
router.get('/autocomplete/employees', bindRoute(controller, 'employees'));
router.get('/autocomplete/specialties', bindRoute(controller, 'specialties'));

export default router;
