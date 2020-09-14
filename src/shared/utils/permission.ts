import { Request, Response, NextFunction } from 'express'
import { IProfile } from '../../database/models/IProfile'

export enum ACTIONS {
  LIST = 1,
  GET = 1,
  CREATE = 2,
  UPDATE = 4
}

interface AuthRequest extends Request {
  user?: {
    id: string
    profile: IProfile
  }
}

export function checkPermission(
  functionality: string,
  action: ACTIONS,
  permitYourself?: boolean
) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (permitYourself) {
      const idParam = Number(req.params.id)
      const idUser = Number(req.user.id)
      if (idParam === idUser) {
        next()
        return
      }
    }

    const { actions } = req.user.profile.functionalities.find(
      item => item.name.toLowerCase() === functionality
    )
    const hasPermission = (action & actions) === action

    if (!hasPermission) {
      return res.status(401).json({ message: 'permission denied' })
    }

    next()
  }
}
