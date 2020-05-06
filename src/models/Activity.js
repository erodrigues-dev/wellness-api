module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.NUMERIC,
    duration: DataTypes.INTEGER
  })

  /*
  Activity.associate = ({ Package }) => {
    Activity.Package = Activity.belongsToMany(Package, {
      foreignKey: 'package_id',
      as: 'package'
    })
  }
  */

  return Activity
}
