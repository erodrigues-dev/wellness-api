import jwt from 'jsonwebtoken';

import Customer from '../../shared/database/models/Customer';
import { compare } from '../../shared/utils/hash-password';

export class SigninUseCase {
  async signin(email: string, password: string): Promise<string> {
    const user = await Customer.findOne({
      where: { email }
    });

    if (!user) return null;

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) return null;

    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '12h'
      }
    );

    return token;
  }
}
