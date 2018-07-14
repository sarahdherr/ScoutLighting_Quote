const User = require('./user')
const Drawing = require('./drawing')
const Fixture = require('./fixture')
const Job = require('./job')
const Quote = require('./quote')
const Run = require('./run')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Quote.belongsTo(User)
Quote.belongsTo(Job)
Fixture.belongsTo(Job)
Run.belongsTo(Fixture)
Drawing.belongsTo(Fixture)
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  User,
  Drawing,
  Fixture,
  Job,
  Quote,
  Run
}
