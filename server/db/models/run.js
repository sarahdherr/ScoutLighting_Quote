const Sequelize = require('sequelize')
const db = require('../db')

const Run = db.define('run', {
  group: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  length: {
    type: Sequelize.INTEGER
  },
  runWattage: {
    type: Sequelize.INTEGER
  },
  totalWattage: {
    type: Sequelize.INTEGER
  },
  trimmable: {
    type: Sequelize.BOOLEAN
  },
  symmetrical: {
    type: Sequelize.BOOLEAN
  },
})

module.exports = Run
