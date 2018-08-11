import axios from 'axios'
import history from '../history'
import calculateCSV from '../helpers/calculateCSV'
import {stockCSV} from '../store'

/**
 * ACTION TYPES
 */
const GET_JOB = 'GET_JOB'
/**
 * INITIAL STATE
 */
const defaultJob = {
  name: '',
  location: '',
  company: '',
  specifier: '',
  type: ''
}

/**
 * ACTION CREATORS
 */
const getJob = job => ({type: GET_JOB, job})

/**
 * THUNK CREATORS
 */
export const stockJob = (job) => async dispatch => {
  try {
    dispatch(getJob(job))
  } catch (err) {
    console.log(err)
  }
}

const saveRun = (runVals, fixture) => async dispatch => {
  try {
    let length = (runVals.lengthFt * 12) + runVals.lengthIn
    let runWattage = Number(fixture.intensity) * (length / 12)
    let totalWattage = runWattage * runVals.quantity
    let run = Object.assign({}, runVals, {length, runWattage, totalWattage})
    let runRes = await axios.post(`https://scout-lighting-quote.herokuapp.com/api/runs`, {run, fixtureId: fixture.id})
    console.log('r !!!!', runRes, fixture)

    let runLength = runRes.data.length / 12
    let runToExport = {
      lengthFt: runLength,
      quantity: runRes.data.quantity,
      wattsPerFt: runRes.data.runWattage / runLength,
      type: 'LC2'
    }
    dispatch(stockCSV(runToExport, fixture))
    // console.log('inputted run')
    // console.log(runToExport)
    // console.log('csv to export')
    // console.log(calculateCSV(runToExport))
  } catch (err) {
    console.log('something went wrong in the post')
    console.error(err)
  }
}

const saveFixture = (fixture, jobId, runs) => async dispatch => {
  try {
    let fixtureRes = await axios.post(`https://scout-lighting-quote.herokuapp.com/api/fixtures`, {fixture, jobId})
    console.log('f !!!!', fixtureRes)
    let fixtureData = fixtureRes.data
    runs.map(run => {
      dispatch(saveRun(run, fixtureData))
    })
  } catch (err) {
    console.log('something went wrong in the post')
    console.error(err)
  }
}

export const saveJob = (job, fixtures, runs) => async dispatch => {
  try {
    let jobRes = await axios.post(`https://scout-lighting-quote.herokuapp.com/api/jobs`, {job})
    let jobId = jobRes.data.id
    // let fixtureRes = await axios.post(`https://scout-lighting-quote.herokuapp.com/api/fixtures`, {fixture, jobId})
    // console.log('f !!!!', fixtureRes)
    fixtures.map((fixture, idx) => {
      dispatch(saveFixture(fixture, jobId, runs[idx]))
    })
  } catch (err) {
    console.log('something went wrong in the post')
    console.error(err)
  }
}



/**
 * REDUCER
 */
export default function (state = defaultJob, action) {
  switch (action.type) {
    case GET_JOB:
      return action.job
    default:
      return state
  }
}
