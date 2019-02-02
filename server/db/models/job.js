const Sequelize = require('sequelize')
const db = require('../db')

const Job = db.define('job', {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  phoneNumber: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },
  location: {
    type: Sequelize.STRING
  },
  company: {
    type: Sequelize.STRING
  },
  specifier: {
    type: Sequelize.STRING
  }
})

module.exports = Job
