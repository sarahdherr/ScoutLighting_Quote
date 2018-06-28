const Sequelize = require('sequelize')
const db = require('../db')

const Fixture = db.define('fixture', {
  partNumber: {
    type: Sequelize.STRING
  },
  prefix: {
    type: Sequelize.STRING
  },
  channel: {
    type: Sequelize.STRING
  },
  lens: {
    type: Sequelize.STRING
  },
  intensity: {
    type: Sequelize.STRING
  },
  cct: {
    type: Sequelize.STRING
  },
  powderCoating: {
    type: Sequelize.STRING
  },
  dimming: {
    type: Sequelize.STRING
  },
  oneDriver: {
    type: Sequelize.STRING
  }
})

module.exports = Fixture
