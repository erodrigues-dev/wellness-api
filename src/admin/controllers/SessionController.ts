import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { PermissionHelper } from '../../shared/models/entities/Permission';
import service from '../../shared/services/UserService';
import { EmployeeRecoverPasswordUseCase } from '../../shared/useCases/employee/recover-password/EmployeeRecoverPasswordUseCase';
import { SendEmailConfirmationUseCase } from '../../shared/useCases/SendEmailConfirmationUseCase';
import { ICloudFile } from '../../shared/utils/interfaces/ICloudFile';

export class SessionController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const payload = await service.login(email, password);
      const permissions = PermissionHelper.listAll(payload.permissions);
      const token = jwt.sign({ ...payload }, process.env.JWT_SECRET, {
        expiresIn: '12h'
      });
      return res.json({ token, permissions });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const { name, email, confirmationCode, password, specialtyId } = req.body;
      const file = req.file as ICloudFile;
      const payload = await service.update({
        id,
        name,
        email,
        confirmationCode,
        password,
        specialtyId,
        imageUrl: file?.url
      });

      const token = jwt.sign({ ...payload }, process.env.JWT_SECRET, {
        expiresIn: '12h'
      });
      const permissions = PermissionHelper.listAll(payload.permissions);

      return res.json({ token, permissions });
    } catch (error) {
      next(error);
    }
  }

  async permissions(req: Request, res: Response, next: NextFunction) {
    try {
      const permissions = PermissionHelper.listAll(req.user.permissions);

      return res.json(permissions);
    } catch (error) {
      next(error);
    }
  }

  async recoverPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      await new EmployeeRecoverPasswordUseCase(email).recover();
      return res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }

  async sendConfirmation(req: Request, res: Response, next: NextFunction) {
    try {
      await new SendEmailConfirmationUseCase(req.body.name, req.body.email).send();

      return res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
}

export default new SessionController();
