const Sequelize = require('sequelize')
const db = require('../db')

const Drawing = db.define('drawing', {
  url: {
    type: Sequelize.STRING,
  }
})

module.exports = Drawing
