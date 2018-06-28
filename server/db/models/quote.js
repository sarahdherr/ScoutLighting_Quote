const Sequelize = require('sequelize')
const db = require('../db')

const Quote = db.define('quote', {
  timestamp: {
    type: Sequelize.TIME
  },
  status: {
    type: Sequelize.STRING
  }
})

module.exports = Quote
