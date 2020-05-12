module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  })

  Employee.associate = ({ Profile }) => {
    Employee.Profile = Employee.belongsTo(Profile, {
      foreignKey: 'profileId',
      as: 'profile'
    })
  }

  return Employee
}
