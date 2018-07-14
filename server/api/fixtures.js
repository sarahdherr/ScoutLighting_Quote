const router = require('express').Router()
const {Fixture} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const fixtures = await Fixture.findAll({})
    res.json(fixtures)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const fixture = req.body.fixture
    const jobId = req.body.jobId
    await Fixture.create(fixture)
      .then(fixtureResponse => fixtureResponse.setJob(jobId))
      .then(fixtureResponse => res.send(fixtureResponse.dataValues))
  } catch (err) {
    console.log('Problem in fixture post route')
    next(err)
  }
})
