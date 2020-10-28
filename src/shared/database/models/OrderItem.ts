import { Association, DataTypes, Model, Sequelize } from 'sequelize/types';

import { PackageTypeEnum } from '../../models/enums/PackageTypeEnum';
import { RecurrencyPayEnum } from '../../models/enums/RecurrencyPayEnum';

import Employee from './Employee';
import Order from './Order';

/**
 * OrderItem
 * - package
 * - activity
 *
 * Esta tabela vai armazenar uma cópia segura do item (activity ou package)
 * Quando for um package o campo itemType tera o valor package
 * e as atividades terão o campo parentId apontando para o id do item (package)
 * será feito um auto-relacionamento para definir as atividades de um pacote
 *
 * packageType === minutes
 * total: armazena o total em minutos
 *
 * packageType === amount
 * total: armazena o total em $
 *
 * packageType === unlimited
 * total: não se aplica
 *
 * packageType === appointments
 * total: armazena a qtd por atividade,
 * este campo ficará vazio no package
 */

export default class OrderItem extends Model {
  id: number;
  orderId: number;
  //package|activity
  itemType: string;
  parentId: number;
  name: string;
  price: number;

  packageRecurrency: RecurrencyPayEnum;
  packageType: PackageTypeEnum;
  total: number;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  static associations: {
    order: Association<OrderItem, Order>;
    user: Association<OrderItem, Employee>;
  };

  static setup(connection: Sequelize) {
    Order.init(
      {
        itemType: DataTypes.STRING,
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        packageRecurrency: DataTypes.STRING,
        packageType: DataTypes.STRING,
        total: DataTypes.DECIMAL
      },
      { sequelize: connection, tableName: 'order_items' }
    );
  }

  static setupAssociations() {
    // Order.belongsTo(Customer, {
    //   foreignKey: 'customerId',
    //   as: 'customer'
    // });
    // Order.belongsTo(Employee, {
    //   foreignKey: 'userId',
    //   as: 'user'
    // });
  }
}
