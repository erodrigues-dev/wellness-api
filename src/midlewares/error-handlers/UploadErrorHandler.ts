import { Response, NextFunction, Request } from 'express';
import { deleteFileFromUrl } from '../../shared/utils/google-cloud-storage';

export default async function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if ('file' in req) {
    await deleteFileFromUrl((req as any).file.url);
  }

  next(err);
}
