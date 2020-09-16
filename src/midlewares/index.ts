import { Router } from 'express'

import jwt from './jwt'
import permissions from './permissions'
import uploads from './uploads'

const router = Router()

router.use(jwt)
router.use(permissions)
router.use(uploads)

export default router
