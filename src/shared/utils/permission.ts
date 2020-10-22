import { Request, Response, NextFunction } from 'express';

export enum ACTIONS {
  LIST = 1,
  GET = 1,
  CREATE = 2,
  UPDATE = 4
}

export function checkPermission(
  functionality: string,
  action: ACTIONS,
  permitYourself?: boolean
) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (permitYourself) {
      const idParam = Number(req.params.id);
      const idUser = Number(req.user.id);
      if (idParam === idUser) {
        next();
        return;
      }
    }

    const { actions } = req.user.profile.functionalities.find(
      item => item.name.toLowerCase() === functionality
    ) || { actions: 0 };
    const hasPermission = (action & actions) === action;

    if (!hasPermission) {
      return res.status(401).json({ message: 'permission denied' });
    }

    next();
  };
}
