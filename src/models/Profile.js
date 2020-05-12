module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    name: DataTypes.STRING,
    description: DataTypes.INTEGER
  })

  Profile.associate = ({ Functionality, Employee }) => {
    Profile.Functionalities = Profile.hasMany(Functionality, {
      foreignKey: 'profileId',
      as: 'functionalities'
    })

    Profile.Employees = Profile.hasMany(Employee, {
      foreignKey: 'profileId',
      as: 'employees'
    })
  }

  return Profile
}
