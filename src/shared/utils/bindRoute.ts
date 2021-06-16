import { Request, Response, NextFunction } from 'express';

export const bindRoute = (controller: any, action: string) => {
  if (!(action in controller)) throw new Error(`action: ${action} is not present in controller`);

  return (req: Request, res: Response, next: NextFunction) => controller[action](req, res, next);
};
