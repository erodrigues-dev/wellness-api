import CustomError from '../custom-error/CustomError';
import Activity from '../database/models/Activity';
import CustomerDiscount from '../database/models/CustomerDiscount';
import Package from '../database/models/Package';
import CustomerDiscountViewModel from '../models/viewmodels/CustomerDiscountViewModel';
import ICustomerDiscountService, {
    IFilter, IStore, IUpdate
} from './interfaces/ICustomerDiscountService';

export class CustomerDiscountService implements ICustomerDiscountService {
  private db = CustomerDiscount;

  async list(filter: IFilter): Promise<CustomerDiscountViewModel[]> {
    const [results] = await this.db.sequelize.query(
      this.buildSelectQuery(filter),
      {
        replacements: {
          customerId: filter.customerId,
          relationName: `%${filter.relationName}%`
        }
      }
    );

    return results.map(item => CustomerDiscountViewModel.from(item));
  }

  async get(id: number): Promise<CustomerDiscountViewModel> {
    const sql = this.buildSelectQuery(null, false, id);
    const [results] = await this.db.sequelize.query(sql, {
      replacements: { id }
    });

    const [item] = results;

    if (!item) throw new CustomError('Discount not found', 404);

    return CustomerDiscountViewModel.from(item);
  }

  find(customerId: number, relationType: string, relationId: number) {
    return CustomerDiscount.findOne({
      where: { customerId, relationType, relationId }
    });
  }

  async count(filter: IFilter): Promise<number> {
    const [results] = await this.db.sequelize.query(
      this.buildSelectQuery(filter, true),
      {
        replacements: {
          customerId: filter.customerId,
          relationName: `%${filter.relationName}%`
        }
      }
    );

    const [{ count }] = results as any;

    return Number(count);
  }

  async store(data: IStore): Promise<number> {
    await this.checkRelationId(data.relationType, data.relationId);
    const { id }: CustomerDiscount = await this.db.create(data);
    return id;
  }

  async update(data: IUpdate): Promise<void> {
    console.log(data);
    const model: CustomerDiscount = await this.db.findByPk(data.id);

    if (!model) throw new CustomError('Discount not found', 404);
    await this.checkRelationId(data.relationType, data.relationId);

    model.type = data.type;
    model.value = data.value;
    model.relationType = data.relationType;
    model.relationId = data.relationId;
    model.userId = data.userId;
    model.customerId = data.customerId;

    await model.save();
  }

  async destroy(id: number): Promise<void> {
    const deleteds = await this.db.destroy({
      where: { id }
    });

    if (deleteds === 0) throw new CustomError('Discount not found', 404);
  }

  private async checkRelationId(type: 'activity' | 'package', id: number) {
    if (type === 'activity') {
      const existActivity = await Activity.findByPk(id);
      if (!existActivity) throw new CustomError('Activity not found', 400);
    }

    if (type === 'package') {
      const existPackage = await Package.findByPk(id);
      if (!existPackage) throw new CustomError('Package not found', 400);
    }
  }

  private getBaseQuery() {
    return `
      SELECT
        cd.id,
        cd.relation_id,
        CASE
          WHEN cd.relation_type = 'activity' THEN a."name"
          WHEN cd.relation_type = 'package' THEN p."name"
        END "relation_name",
        cd.relation_type,
        cd."type",
        cd.value,
        cd.customer_id,
        c."name" as customer_name,
        cd.user_id,
        e."name" as user_name,
        cd.created_at,
        cd.updated_at
      FROM customer_discounts cd
      LEFT OUTER JOIN activities a on	a.id = cd.relation_id
      LEFT OUTER JOIN packages p on p.id = cd.relation_id
      JOIN customers c on c.id = cd.customer_id
      JOIN employees e on e.id = cd.user_id
    `;
  }

  private buildSelectQuery(
    filter: IFilter,
    count = false,
    id: number = null
  ): string {
    let sql = `SELECT ${
      count ? 'COUNT(1)' : '*'
    } FROM (${this.getBaseQuery()}) q1`;

    const where = [
      filter?.customerId ? 'q1.customer_id = :customerId' : null,
      filter?.relationName ? 'q1.relation_name ilike :relationName' : null,
      id ? 'q1.id = :id' : null
    ].filter(condition => condition !== null);

    if (where.length > 0) {
      sql = `${sql} WHERE ${where.join(' AND ')}`;
    }

    if (filter?.page && !count && !id) {
      sql = `${sql} limit ${filter.limit || 10} offset ${
        (filter.page - 1) * (filter.limit || 10)
      }`;
    }

    return sql;
  }
}

export default new CustomerDiscountService();
