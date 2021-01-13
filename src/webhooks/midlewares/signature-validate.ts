import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const isValid = (check: string, key: string, signature: string) => {
  const hmac = crypto.createHmac('sha1', key);

  hmac.write(check);
  hmac.end();

  const checkHash = hmac.read().toString('base64');

  return checkHash == signature;
};

export const signatureValidate = (hook: string, signatureKey: string) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const url = `${process.env.SQUARE_WEBHOOK_BASEURL}/${hook}`;
  const body = JSON.stringify(req.body);
  const signature = req.headers['x-square-signature'] as string;

  try {
    const isValidSignature = isValid(url + body, signatureKey, signature);

    if (isValidSignature) {
      next();
      return;
    }
  } catch (error) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED);
  }
  return res.sendStatus(StatusCodes.UNAUTHORIZED);
};
