import { Router } from 'express';
import { bindRoute } from '../../shared/utils/bindRoute';

import { Permission } from '../../shared/models/entities/Permission';
import { checkPermission } from '../../shared/utils/permission';

import { makeTeamGroupController } from '../controllers/TeamGroupController';

const router = Router();
const controller = makeTeamGroupController();

router.get('/team-groups', checkPermission(Permission.TeamGroupList), bindRoute(controller, 'index'));
router.get('/team-groups/:id', checkPermission(Permission.TeamGroupList), bindRoute(controller, 'get'));
router.post('/team-groups', checkPermission(Permission.TeamGroupCreateUpdate), bindRoute(controller, 'create'));
router.put('/team-groups/:id', checkPermission(Permission.TeamGroupCreateUpdate), bindRoute(controller, 'update'));
router.delete('/team-groups/:id', checkPermission(Permission.TeamGroupDelete), bindRoute(controller, 'destroy'));

export default router;
