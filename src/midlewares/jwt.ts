import expressJwt from 'express-jwt'
import { Router } from 'express'

const router = Router()

router.use(
  expressJwt({
    secret: process.env.JWT_SECRET
  }).unless({
    path: ['/sessions']
  })
)

export default router
