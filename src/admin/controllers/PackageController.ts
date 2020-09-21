import { NextFunction, Response } from 'express';
import packageService from '../../shared/services/PackageService';
import IPackageService from '../../shared/services/interfaces/IPackageService';
import IPackageController, {
  IGetRequest,
  IIndexRequest,
  IStoreRequest,
  IUpdateRequest
} from './interfaces/IPackageController';
import IActivity from '../../shared/models/IActivity';
import { deleteFileFromUrl } from '../../shared/utils/google-cloud-storage';

export class PackageController implements IPackageController {
  constructor(private service: IPackageService) {}

  async index(
    req: IIndexRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { name, activityName, page, limit } = req.query;
      const count = await this.service.count({ name, activityName });
      const list = await this.service.list({ name, activityName }, page, limit);
      return res.header('X-Total-count', count.toString()).json(list);
    } catch (error) {
      next(error);
    }
  }

  async get(
    req: IGetRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { id } = req.params;
      const model = await this.service.get(id);
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }

  async store(
    req: IStoreRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const {
        name,
        price,
        description,
        expiration,
        showInApp,
        showInWeb,
        activities
      } = req.body;
      const model = await this.service.create({
        name,
        price,
        description,
        expiration,
        showInApp,
        showInWeb,
        activities: activities as IActivity[],
        imageUrl: req.file?.url
      });

      return res.json(model);
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: IUpdateRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const {
        id,
        name,
        price,
        description,
        expiration,
        showInApp,
        showInWeb,
        activities
      } = req.body;
      const model = await this.service.update({
        id,
        name,
        price,
        description,
        expiration,
        showInApp,
        showInWeb,
        activities: activities as IActivity[],
        imageUrl: req.file?.url
      });

      return res.json(model);
    } catch (error) {
      next(error);
    }
  }
}

export default new PackageController(packageService);

//   async update(req, res, next) {
//     const transaction = await sequelize.transaction();
//     try {
//       const {
//         id,
//         name,
//         price,
//         description,
//         activities,
//         expiration,
//         showInWeb,
//         showInApp
//       } = req.body;
//       const storePackage = await Package.findByPk(id);
//       if (!storePackage) {
//         return res.status(404).json({ message: 'package not found' });
//       }
//       storePackage.name = name;
//       storePackage.price = price;
//       storePackage.description = description;
//       storePackage.expiration = expiration;
//       storePackage.showInWeb = showInWeb;
//       storePackage.showInApp = showInApp;

//       if (req.file) {
//         if (storePackage.imageUrl) {
//           deleteFileFromUrl(storePackage.imageUrl);
//         }

//         storePackage.imageUrl = req.file.url;
//       }

//       await storePackage.save({ transaction });
//       await storePackage.setActivities([], { transaction });

//       await Promise.all(
//         activities.map(item =>
//           storePackage.addActivity(item.id, {
//             through: { quantity: item.quantity },
//             transaction
//           })
//         )
//       );

//       await transaction.commit();
//       return res.status(204).json();
//     } catch (error) {
//       await transaction.rollback();
//       next(error);
//     }
//   },

//   async destroy(req, res, next) {
//     try {
//       const { id } = req.params;
//       const result = await Package.destroy({ where: { id } });

//       if (result === 0) {
//         return res.status(404).json({ message: 'package not found' });
//       }

//       return res.json();
//     } catch (error) {
//       next(error);
//     }
//   }
// };
