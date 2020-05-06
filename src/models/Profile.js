module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    name: DataTypes.STRING,
    description: DataTypes.INTEGER
  })

  Profile.associate = ({ Functionality }) => {
    Profile.Functionalities = Profile.hasMany(Functionality, {
      foreignKey: 'profile_id',
      as: 'functionalities'
    })
  }

  return Profile
}
