module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.NUMERIC,
    duration: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING
  })

  Activity.associate = ({ Package, PackageActivity, Employee }) => {
    Activity.Packages = Activity.belongsToMany(Package, {
      through: PackageActivity,
      as: 'packages'
    })

    Activity.Employee = Activity.belongsTo(Employee, {
      foreignKey: 'employeeId',
      as: 'employee'
    })
  }

  return Activity
}
