import { Router } from 'express'

import session from './Session'
import customer from './Customer'

const router = Router()

//TODO
//- permissions
//- uploads
//- validates
//- controllers
//- routes

router.use(session)
router.use(customer)

export default router
