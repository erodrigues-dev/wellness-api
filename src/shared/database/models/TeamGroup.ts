import { Model, Sequelize, DataTypes, BelongsToManySetAssociationsMixin } from 'sequelize';
import Customer from './Customer';

export default class TeamGroup extends Model {
  id: string;
  name: string;

  members?: Customer[];

  setMembers: BelongsToManySetAssociationsMixin<Customer, number>;

  static setup(connection: Sequelize) {
    TeamGroup.init(
      {
        name: DataTypes.STRING
      },
      {
        sequelize: connection,
        tableName: 'team_groups'
      }
    );
  }

  static setupAssociations() {
    TeamGroup.belongsToMany(Customer, {
      through: 'team_groups_members',
      as: 'members',
      otherKey: 'member_id',
      foreignKey: 'team_group_id',
      timestamps: false
    });
  }
}
