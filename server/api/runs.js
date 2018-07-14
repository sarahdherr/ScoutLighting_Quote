const router = require('express').Router()
const {Run} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const runs = await Run.findAll({})
    res.json(runs)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const run = req.body.run
    const fixtureId = req.body.fixtureId
    await Run.create(run)
      .then(runRes => runRes.setFixture(fixtureId))
      .then(runRes => res.send(runRes.dataValues))
  } catch (err) {
    console.log('Problem in run post route')
    next(err)
  }
})
