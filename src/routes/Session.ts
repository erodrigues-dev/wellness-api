import { Router } from 'express'

import sessionController from '../controllers/Session'

const router = Router()

router.post('/sessions', (req, res) => sessionController.login(req, res))

export default router
