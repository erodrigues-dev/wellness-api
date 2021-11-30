import { Router } from 'express';
import { bindRoute } from '../../shared/utils/bindRoute';

import { makeTeamGroupController } from '../controllers/TeamGroupController';

const router = Router();
const controller = makeTeamGroupController();

router.get('/team-groups', bindRoute(controller, 'index'));
router.get('/team-groups/:id', bindRoute(controller, 'get'));
router.post('/team-groups', bindRoute(controller, 'create'));
router.put('/team-groups/:id', bindRoute(controller, 'update'));
router.delete('/team-groups/:id', bindRoute(controller, 'destroy'));

export default router;
