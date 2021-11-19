import { NextFunction, Response } from 'express';

import { PermissionHelper } from '../../shared/models/entities/Permission';

export class DomainController {
  getDefaultPermissions(_, res: Response, next: NextFunction) {
    try {
      const permissions = PermissionHelper.listAll(0);
      return res.json(permissions);
    } catch (error) {
      next(error);
    }
  }
}

export default new DomainController();
