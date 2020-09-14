import { ACTIONS, checkPermission } from '../../shared/utils/permission'

import express from 'express'

const router = express.Router()

router.post('/activities', checkPermission('activities', ACTIONS.CREATE))
router.put('/activities', checkPermission('activities', ACTIONS.UPDATE))

export default router
