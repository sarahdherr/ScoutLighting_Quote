const router = require('express').Router()
const {Job} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const jobs = await Job.findAll({})
    res.json(jobs)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const job = req.body.job
    await Job.create(job)
      .then(jobResponse =>
        res.send(jobResponse.dataValues)
      )
  } catch (err) {
    console.log('Problem in job post route')
    next(err)
  }
})
