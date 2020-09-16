import { Router } from 'express'

import { ACTIONS, checkPermission } from '../../shared/utils/permission'

const router = Router()

router.get('/employees', checkPermission('employees', ACTIONS.LIST))
router.get('/employees/:id', checkPermission('employees', ACTIONS.GET, true))
router.post('/employees', checkPermission('employees', ACTIONS.CREATE))
router.put('/employees', checkPermission('employees', ACTIONS.UPDATE))

export default router
