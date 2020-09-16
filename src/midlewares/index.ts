import { Router } from 'express'

import jwt from './jwt'
import permissions from './permissions'

const router = Router()

router.use(jwt)
router.use(permissions)

export default router
