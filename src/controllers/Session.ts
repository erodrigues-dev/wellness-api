import jwt from 'jsonwebtoken'
import { Response, Request } from 'express'

import IUserService from '../shared/services/interfaces/IUserService'
import userService from '../shared/services/UserService'

export class SessionController {
  constructor(private service: IUserService) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body
    const payload = await this.service.login(email, password)

    if (!payload) return res.status(401).json()

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '12h'
    })

    return res.json({ token })
  }
}

export default new SessionController(userService)
