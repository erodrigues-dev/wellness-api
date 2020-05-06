module.exports = (sequelize, DataTypes) => {
  const Package = sequelize.define('Package', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.NUMERIC
  })

  /*
  Package.associate = ({ Activity }) => {
    Package.Activity = Package.belongsToMany(Activity, {
      foreignKey: 'activity_id',
      as: 'activity'
    })
  }
  */

  return Package
}
