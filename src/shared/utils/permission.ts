import { NextFunction, Request, Response } from 'express';

import { PermissionItem } from '../models/entities/Permission';

export function checkPermission(functionality: string, action: PermissionItem) {
  return (req: Request, res: Response, next: NextFunction) => {
    const permissions = req.user.permissions;
    const hasPermission = (action.id & permissions) === action.id;

    if (!hasPermission) {
      return res.status(401).json({
        message: 'permission denied',
        required: functionality,
        level: action
      });
    }

    next();
  };
}
