import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

export function hash(password: string) {
  return bcrypt.hash(password, 8);
}

export function compare(password: string, hash: string) {
  if (!hash) return false;
  return bcrypt.compare(password, hash);
}

export function generateTempPassword() {
  return randomBytes(8).toString('hex');
}

export function generateConfirmationCode() {
  return randomBytes(4).toString('hex').toUpperCase();
}

export function generateRandomCode(length = 8) {
  return randomBytes(Math.round(length / 2))
    .toString('hex')
    .toUpperCase();
}
