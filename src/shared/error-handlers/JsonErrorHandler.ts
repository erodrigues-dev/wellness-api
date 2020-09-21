import { Request, Response, NextFunction } from 'express';

export default function (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof Error) {
    return res.status(500).json({ message: err.message });
  }

  return res.status(500).json({ error: err });
}
