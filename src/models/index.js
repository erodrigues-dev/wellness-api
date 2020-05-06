const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const db = {}
const sequelize = require('../database')

// reference
// https://blog.rocketseat.com.br/nodejs-express-sequelize/

console.log('importing models:')

fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 &&
      file !== path.basename(__filename) &&
      file.slice(-3) === '.js'
  )
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
    console.log('model imported -> ', model.name)
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    console.log('config associate -> ', modelName)
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
