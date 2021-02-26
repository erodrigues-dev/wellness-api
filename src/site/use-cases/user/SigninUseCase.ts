import jwt from 'jsonwebtoken';

import Customer from '../../../shared/database/models/Customer';
import { compare } from '../../../shared/utils/hash-password';
import { sendEmailRecoverPassword } from '../../../shared/sendingblue';
import { generateTempPassword, hash } from '../../../shared/utils/hash-password';

export class SigninUseCase {
  async signin(email: string, password: string): Promise<any> {
    const user = await this.findByEmail(email);

    if (!user) return null;

    const isValidPassword = (await compare(password, user.password)) || (await compare(password, user.tempPassword));

    if (!isValidPassword) return null;

    const token = await this.generateToken(user);
    return {
      token,
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      image_url: user.imageUrl
    };
  }

  async recoverPassword(email: string): Promise<void> {
    const user = await this.findByEmail(email);

    if (!user) return;

    const tempPassword = generateTempPassword();
    user.tempPassword = await hash(tempPassword);

    await user.save();

    await sendEmailRecoverPassword.send({
      name: user.name,
      email,
      tempPassword
    });
  }

  private async findByEmail(email: string) {
    return await Customer.findOne({
      where: { email }
    });
  }

  private generateToken(user: Customer) {
    return jwt.sign(
      {
        id: user.id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '12h'
      }
    );
  }
}
