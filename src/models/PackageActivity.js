module.exports = (sequelize, DataTypes) => {
  const PackageActivity = sequelize.define('PackageActivity', {
    quantity: DataTypes.INTEGER
  })

  return PackageActivity
}
