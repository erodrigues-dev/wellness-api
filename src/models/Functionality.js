module.exports = (sequelize, DataTypes) => {
  const Functionality = sequelize.define('Functionality', {
    name: DataTypes.STRING,
    actions: DataTypes.INTEGER
  })

  Functionality.associate = ({ Profile }) => {
    Functionality.Profile = Functionality.belongsTo(Profile, {
      foreignKey: 'profileId',
      as: 'profile'
    })
  }

  return Functionality
}
