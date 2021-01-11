import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

import IUserService from '../../shared/services/interfaces/IUserService';
import userService from '../../shared/services/UserService';
import ISessionController, { ILoginRequest, IUpdateRequest } from './interfaces/ISessionController';

export class SessionController implements ISessionController {
  constructor(private service: IUserService) {}

  async login(req: ILoginRequest, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const payload = await this.service.login(email, password);

      if (!payload) return res.status(401).json();

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '12h'
      });

      return res.json({ token });
    } catch (error) {
      next(error);
    }
  }

  async update(req: IUpdateRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const { name, email, password, specialty } = req.body;
      const payload = await this.service.update({
        id,
        name,
        email,
        password,
        specialty,
        imageUrl: req.file?.url
      });

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '12h'
      });

      return res.json({ token });
    } catch (error) {
      next(error);
    }
  }
}

const sessionController: ISessionController = new SessionController(
  userService
);

export default sessionController;
