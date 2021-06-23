import { Request, Response, NextFunction } from 'express';

export const bindRoute = <T, K extends keyof T>(controller: T, action: K) => {
  if (!(action in controller)) throw new Error(`action: ${action} is not present in controller`);

  return (req: Request, res: Response, next: NextFunction) => controller[String(action)](req, res, next);
};
