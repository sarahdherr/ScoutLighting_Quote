import axios from 'axios'

/**
 * ACTION TYPES
 */
const STOCK_RUNS = 'STOCK_RUNS'
const STOCK_ANOTHER_RUN = 'STOCK_ANOTHER_RUN'
const STOCK_ANOTHER_FIXTURE_RUNS = 'STOCK_ANOTHER_FIXTURE_RUNS'
const DELETE_RUN = 'DELETE_RUN'

/**
 * INITIAL STATE
 */
const defaultRun = {
  group: 0,
  quantity: 0,
  lengthFt: 0,
  lengthIn: 0,
  runWatts: 0,
  totalWatts: 0,
  trimmable: false,
  symmetrical: false
}

const defaultRuns = { 0: [ defaultRun, defaultRun, defaultRun ] }

/**
 * ACTION CREATORS
 */
const stockRuns = (idx, runs) => {
  return ({type: STOCK_RUNS, runs, idx})
}

const stockAnotherRun = (idx, run) => ({type: STOCK_ANOTHER_RUN, idx, run})

const stockAnotherRunGroup = (idx) => ({type: STOCK_ANOTHER_FIXTURE_RUNS, idx})

const deleteRun = (fixtureIdx, runIdx) => ({type: DELETE_RUN, fixtureIdx, runIdx})

/**
 * THUNK CREATORS
 */
export const stockRunsForFixture = (idx) => async dispatch => {
  try {
    dispatch(stockAnotherRunGroup(idx))
  } catch (err) {
    console.log(err)
  }
}

export const setRuns = (idx, runs) => async dispatch => {
  try {
    dispatch(stockRuns(idx, runs))
  } catch (err) {
    console.log(err)
  }
}

export const removeRun = (fixtureIdx, runIdx) => async dispatch => {
  try {
    dispatch(deleteRun(fixtureIdx, runIdx))
  } catch (err) {
    console.log(err)
  }
}

export const addAnotherRun = (idx) => async dispatch => {
  try {
    let defaultRun = {
      group: 0,
      quantity: 0,
      lengthFt: 0,
      lengthIn: 0,
      runWatts: 0,
      totalWatts: 0,
      trimmable: false,
      symmetrical: false
    }
    dispatch(stockAnotherRun(idx, defaultRun))
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultRuns, action) {
  var newState = Object.assign({}, state)
  switch (action.type) {
    case STOCK_RUNS:
      newState[action.idx] = action.runs
      break
    case STOCK_ANOTHER_RUN:
      newState[action.idx].push(action.run)
      break
    case STOCK_ANOTHER_FIXTURE_RUNS:
      newState[action.idx] = [ defaultRun, defaultRun, defaultRun ]
      break
    case DELETE_RUN:
      newState[action.fixtureIdx].splice(action.runIdx, 1)
      break
    default:
      break
  }
  return newState
}
