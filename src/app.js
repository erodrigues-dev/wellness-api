const express = require('express')
const consign = require('consign')

require('dotenv/config')
require('./database/index')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// prettier-ignore
consign({ cwd: 'src' })
  .include('midlewares/cors.js')
  .then('midlewares/jwt.js')
  .then('midlewares/permissions')
  .then('midlewares/uploads')
  .then('midlewares/validates')
  .then('controllers')
  .then('routes')
  .then('midlewares/db-error.js')
  .then('midlewares/error-as-json.js')
  .into(app)

module.exports = app
