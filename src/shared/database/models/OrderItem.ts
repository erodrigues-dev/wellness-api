import { Association, DataTypes, Model, Sequelize } from 'sequelize';

import { OrderItemTypeEnum } from '../../models/enums/OrderItemTypeEnum';
import { PackageTypeEnum } from '../../models/enums/PackageTypeEnum';
import { RecurrencyPayEnum } from '../../models/enums/RecurrencyPayEnum';
import Order from './Order';

/**
 * OrderItem
 * - package
 * - activity
 *
 * Esta tabela vai armazenar uma cópia segura do item (activity ou package)
 * e as atividades terão o campo parentId apontando para o id do item (package)
 * será feito um auto-relacionamento para definir as atividades de um pacote
 *
 * valueType === minutes
 * value: armazena o total em minutos
 *
 * valueType === amount
 * value: armazena o total em $
 *
 * valueType === unlimited
 * value: não se aplica
 *
 * valueType === appointments
 * value: armazena a qtd por atividade,
 * este campo ficará vazio no package
 */

export default class OrderItem extends Model {
  id?: number;
  orderId: number;
  type: OrderItemTypeEnum;
  metadataId: number;
  parentId?: number;
  name: string;
  price: number;
  quantity: number;
  recurrency?: RecurrencyPayEnum;
  valueType?: PackageTypeEnum;
  value?: number;
  expiresIn: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  static associations: {
    order: Association<OrderItem, Order>;
    parent: Association<OrderItem, OrderItem>;
  };

  static setup(connection: Sequelize) {
    OrderItem.init(
      {
        type: DataTypes.STRING,
        metadataId: DataTypes.INTEGER,
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        quantity: DataTypes.INTEGER,
        recurrency: DataTypes.STRING,
        valueType: DataTypes.STRING,
        value: DataTypes.DECIMAL,
        expiresIn: DataTypes.DATE
      },
      { sequelize: connection, tableName: 'order_items' }
    );
  }

  static setupAssociations() {
    OrderItem.belongsTo(Order, {
      foreignKey: 'orderId',
      as: 'order'
    });
    OrderItem.belongsTo(OrderItem, {
      foreignKey: 'parentId',
      as: 'parent'
    });
  }
}
