import { Router } from 'express'

import jwt from './jwt'

const router = Router()

router.use(jwt)

export default router
