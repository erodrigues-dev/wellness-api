import { NextFunction, Request, Response } from 'express';

import { PermissionItem } from '../models/entities/Permission';

export function checkPermission(action: PermissionItem) {
  return (req: Request, res: Response, next: NextFunction) => {
    const permissions = req.user.permissions;
    const hasPermission = (action.id & permissions) === action.id;

    if (!hasPermission) {
      return res.status(403).json({
        message: 'permission denied',
        required: action.name,
        level: action.id
      });
    }

    next();
  };
}
