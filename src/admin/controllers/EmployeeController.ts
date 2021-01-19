import { NextFunction, Request, Response } from 'express';

import employeeService, { EmployeeService } from '../../shared/services/EmployeeService';
import { CreateEmployeeModel } from '../../shared/useCases/employee/create/CreateEmployeeModel';
import { CreateEmployeeUseCase } from '../../shared/useCases/employee/create/CreateEmployeeUseCase';
import { ICloudFile } from '../../shared/utils/interfaces/ICloudFile';

export class EmployeeController {
  constructor(private service: EmployeeService) {}

  async index(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const {
        name,
        email,
        specialty,
        profile,
        page,
        limit
      } = this.parseQueryIndexParams(req.query);
      const total = await this.service.count({
        name,
        email,
        specialty,
        profile
      });
      const list = await this.service.list(
        { name, email, specialty, profile },
        page,
        limit
      );
      return res.header('X-Total-Count', total.toString()).json(list);
    } catch (error) {
      next(error);
    }
  }

  async get(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { id } = req.params as any;
      const model = await this.service.get(id);
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }

  async store(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const createModel = new CreateEmployeeModel()
        .parse(req.body)
        .withImageUrl(req.file as ICloudFile);

      const model = await new CreateEmployeeUseCase(createModel).create();

      return res.json(model);
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { id, name, email, specialty, password, profileId } = req.body;
      const model = await this.service.update({
        id,
        name,
        email,
        specialty,
        password,
        profileId,
        imageUrl: (req.file as ICloudFile)?.url
      });
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }

  private parseQueryIndexParams(query: any) {
    return {
      name: (query.name as string) || null,
      email: (query.email as string) || null,
      specialty: (query.specialty as string) || null,
      profile: (query.profile as string) || null,
      page: (query.page as number) || null,
      limit: (query.limit as number) || null
    };
  }
}

export default new EmployeeController(employeeService);
