import calculateCSV from '../helpers/calculateCSV'

/**
 * ACTION TYPES
 */
const SET_CSV = 'SET_CSV'
/**
 * INITIAL STATE
 */
const defaultState = {}

/**
 * ACTION CREATORS
 */
const setCSV = (runToExport, fixtureName) => ({type: SET_CSV, runToExport, fixtureName})

/**
 * THUNK CREATORS
 */
export const stockCSV = (runToExport, fixture) => async dispatch => {
  try {
    // console.log('!!!!!', fixture)
    let values = calculateCSV(runToExport, fixture)
    dispatch(setCSV(values, fixture.fixtureName))
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultState, action) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case SET_CSV:
      if (newState[action.fixtureName]) {
        newState[action.fixtureName] = newState[action.fixtureName].concat(action.runToExport)
      } else {
        newState[action.fixtureName] = action.runToExport
      }
      break
    default:
      break
  }
  return newState
}
