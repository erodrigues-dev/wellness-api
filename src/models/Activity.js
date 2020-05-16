module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.NUMERIC,
    duration: DataTypes.INTEGER
  })

  Activity.associate = ({ Package, PackageActivity }) => {
    Activity.Packages = Activity.belongsToMany(Package, {
      through: PackageActivity,
      as: 'packages'
    })
  }

  return Activity
}
