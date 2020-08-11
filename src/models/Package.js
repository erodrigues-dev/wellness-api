module.exports = (sequelize, DataTypes) => {
  const Package = sequelize.define('Package', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    description: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    expiration: DataTypes.DATEONLY,
    showInApp: DataTypes.BOOLEAN,
    showInWeb: DataTypes.BOOLEAN
  })

  Package.associate = ({ Activity, PackageActivity }) => {
    Package.Activities = Package.belongsToMany(Activity, {
      through: PackageActivity,
      as: 'activities'
    })
  }

  return Package
}
