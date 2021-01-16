import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

export function hash(password: string) {
  return bcrypt.hash(password, 8);
}

export function compare(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function generateTempPassword() {
  return randomBytes(8).toString('hex');
}
