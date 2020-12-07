import { Transaction } from 'sequelize';

import CustomError from '../../custom-error/CustomError';
import connection from '../../database/connection';
import Package from '../../database/models/Package';
import { PackageDTO } from '../../models/dto/PackageDTO';
import { RecurrencyPayEnum } from '../../models/enums/RecurrencyPayEnum';
import { SquareCatalogUpsertRequestBuilder } from '../../square/models/SquareCatalogRequest';
import { squareCatalogService } from '../../square/services';
import { deleteFileFromUrl } from '../../utils/google-cloud-storage';

export class PackageUseCase {
  private transaction: Transaction;

  constructor(private data: PackageDTO) {}

  async create() {
    try {
      this.transaction = await connection.transaction();
      const model = await this.createInDb();
      const isRecurrency = model.recurrencyPay !== RecurrencyPayEnum.oneTime;

      if (isRecurrency) {
        const { id } = await this.createInSquare();
        await this.updateSquareIdInDb(model.id, id);
      }

      await this.transaction.commit();
    } catch (error) {
      await this.transaction.rollback();
      throw error;
    }
  }

  async update() {
    try {
      this.transaction = await connection.transaction();
      const model = await this.updateInDb();
      const isRecurrency = model.recurrencyPay !== RecurrencyPayEnum.oneTime;
      let squareId = isRecurrency ? model.squareId : null;
      if (isRecurrency) {
        const { id } = await this.updateInSquare(squareId);
        squareId = id;
      }
      await this.updateSquareIdInDb(model.id, squareId);
      await this.transaction.commit();
    } catch (error) {
      await this.transaction.rollback();
      throw error;
    }
  }

  private async createInSquare() {
    const req = new SquareCatalogUpsertRequestBuilder();
    req.setName(this.data.name);
    req.setPrice(this.data.price);
    req.setRecurrency(this.data.recurrencyPay);
    const objRequest = req.build();
    return squareCatalogService.upsert(objRequest);
  }

  private async updateInSquare(catalogId: string) {
    const catalog = catalogId
      ? await squareCatalogService.get(catalogId)
      : null;
    const req = new SquareCatalogUpsertRequestBuilder(catalog);
    req.setName(this.data.name);
    req.setPrice(this.data.price);
    req.setRecurrency(this.data.recurrencyPay);
    const objRequest = req.build();
    return squareCatalogService.upsert(objRequest);
  }

  private async createInDb(): Promise<Package> {
    const { activities, ...dataModel } = this.data;
    const model = await Package.create(dataModel, {
      transaction: this.transaction
    });

    await Promise.all(
      activities.map(({ id, quantity }) =>
        model.addActivity(id, {
          through: { quantity },
          transaction: this.transaction
        })
      )
    );

    return model;
  }

  private async updateInDb(): Promise<Package> {
    const model = await Package.findByPk(this.data.id);
    if (!model) throw new CustomError('Package not found', 404);

    model.name = this.data.name;
    model.description = this.data.description;
    model.price = this.data.price;
    model.recurrencyPay = this.data.recurrencyPay;
    model.expiration = this.data.expiration;
    model.showInApp = this.data.showInApp;
    model.showInWeb = this.data.showInWeb;
    model.categoryId = this.data.categoryId;
    model.type = this.data.type;
    model.total = this.data.total || null;

    if (this.data.imageUrl) {
      if (model.imageUrl) {
        const url = model.imageUrl;
        this.transaction.afterCommit(() => {
          deleteFileFromUrl(url)
            .then(() => {})
            .catch(() => {});
        });
      }

      model.imageUrl = this.data.imageUrl;
    }

    await model.save({ transaction: this.transaction });
    await model.setActivities([], { transaction: this.transaction });

    await Promise.all(
      this.data.activities.map(({ id, quantity }) =>
        model.addActivity(id, {
          through: { quantity },
          transaction: this.transaction
        })
      )
    );

    return model;
  }

  private async updateSquareIdInDb(packageId: number, squareId: string) {
    await Package.update(
      { squareId },
      { where: { id: packageId }, transaction: this.transaction }
    );
  }
}
