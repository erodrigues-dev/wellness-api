import express from 'express'

import { create } from '../controllers/Session'

const router = express.Router()

router.post('/sessions', create)

export default router
