import jwt from 'jsonwebtoken'
import { Response, Request } from 'express'

import * as hashPassword from '../shared/utils/hash-password'
import { Employee } from '../database/models/Employee'
import { IEmployee } from '../database/models/IEmployee'
import { Profile } from '../database/models/Profile'

export async function create(req: Request, res: Response) {
  const { email, password } = req.body
  const user: IEmployee = await Employee.findOne({
    where: { email },
    include: [
      {
        association: Employee.associations.profile,
        include: [Profile.associations.functionalities]
      }
    ]
  })

  if (!user) {
    return res.status(401).json()
  }

  const match = await hashPassword.compare(password, user.password)

  if (!match) {
    return res.status(401).json()
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    imageUrl: user.imageUrl,
    profile: {},
    type: 'employee'
  }

  if (user.profile) {
    const { id, name, functionalities: list } = user.profile
    const functionalities = list.map(item => ({
      name: item.name,
      actions: item.actions
    }))

    payload.profile = {
      id,
      name,
      functionalities
    }
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '12h'
  })

  return res.json({ token })
}
