import { Router } from 'express'

import jwt from './jwt'
import permissions from './permissions'
import uploads from './uploads'
import validates from './validates'

const router = Router()

router.use(jwt)
router.use(permissions)
router.use(uploads)
router.use(validates)

export default router
