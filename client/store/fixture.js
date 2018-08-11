import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const STOCK_NAME = 'STOCK_NAME'
const STOCK_PREFIX = 'STOCK_PREFIX'
const STOCK_CHANNEL = 'STOCK_CHANNEL'
const STOCK_LENS = 'STOCK_LENS'
const STOCK_INTENSITY = 'STOCK_INTENSITY'
const STOCK_CCT = 'STOCK_CCT'
const STOCK_DIMMING = 'STOCK_DIMMING'
const STOCK_COATING = 'STOCK_COATING'
const STOCK_ANOTHER_FIXTURE = 'STOCK_ANOTHER_FIXTURE'

/**
 * INITIAL STATE
 */
const defaultFixture = {
  fixtureName: '',
  prefix: 'SS',
  channel: '',
  lens: '',
  intensity: '',
  cct: '',
  dimming: '',
  powderCoating: '',
  partNumber: ''
}

const defaultFixtures = {0: defaultFixture}

/**
 * ACTION CREATORS
 */
const stockName = (idx, fixtureName) => ({type: STOCK_NAME, idx, fixtureName})
const stockPrefix = (idx, prefix) => ({type: STOCK_PREFIX, idx, prefix})
const stockChannel = (idx, channel) => ({type: STOCK_CHANNEL, idx, channel})
const stockLens = (idx, lens) => ({type: STOCK_LENS, idx, lens})
const stockIntensity = (idx, intensity) => ({type: STOCK_INTENSITY, idx, intensity})
const stockCct = (idx, cct) => ({type: STOCK_CCT, idx, cct})
const stockDimming = (idx, dimming) => ({type: STOCK_DIMMING, idx, dimming})
const stockCoating = (idx, coating) => ({type: STOCK_COATING, idx, coating})
const stockAnotherFixture = (idx, fixture) => ({type: STOCK_ANOTHER_FIXTURE, idx, fixture})

/**
 * THUNK CREATORS
 */

export const setName = (idx, fixtureName) => async dispatch => {
  try {
    dispatch(stockName(idx, fixtureName))
  } catch (err) {
    console.log(err)
  }
}
export const setPrefix = (idx, prefix) => async dispatch => {
  try {
    dispatch(stockPrefix(idx, prefix))
  } catch (err) {
    console.log(err)
  }
}

export const setChannel = (idx, channel) => async dispatch => {
  try {
    dispatch(stockChannel(idx, channel))
  } catch (err) {
    console.log(err)
  }
}

export const setLens = (idx, lens) => async dispatch => {
  try {
    dispatch(stockLens(idx, lens))
  } catch (err) {
    console.log(err)
  }
}

export const setIntensity = (idx, intensity) => async dispatch => {
  try {
    dispatch(stockIntensity(idx, intensity))
  } catch (err) {
    console.log(err)
  }
}

export const setCct = (idx, cct) => async dispatch => {
  try {
    dispatch(stockCct(idx, cct))
  } catch (err) {
    console.log(err)
  }
}

export const setDimming = (idx, dimming) => async dispatch => {
  try {
    dispatch(stockDimming(idx, dimming))
  } catch (err) {
    console.log(err)
  }
}

export const setCoating = (idx, coating) => async dispatch => {
  try {
    dispatch(stockCoating(idx, coating))
  } catch (err) {
    console.log(err)
  }
}

export const saveFixture = (fixture) => async dispatch => {
  let res
  try {
    // /fixtures routes still to write
    res = await axios.post(`https://scout-lighting-quote.herokuapp.com/api/fixtures`, {fixture})
  } catch (err) {
    console.error(err)
  }
}

export const addAnotherFixture = (idx) => async dispatch => {
  try {
    let fix = {
      fixtureName: '',
      prefix: 'SS',
      channel: '',
      lens: '',
      intensity: '',
      cct: '',
      dimming: '',
      coating: '',
      partNumber: ''
    }
    dispatch(stockAnotherFixture(idx, fix))
  } catch (err) {
    console.log(err)
  }
}


const calculatePartNumber = (fixture) => {
  let prefix = fixture.prefix
  let channel = fixture.channel.split(' - ')[0]
  let lens = fixture.lens.split(' - ')[0]
  let intensity = Number(fixture.intensity)
  let cct = fixture.cct.split(' - ')[0]

  let partNumber = `${prefix}${channel}${lens}${(intensity > 0) ? intensity : ''}${cct}`
  return partNumber
}
/**
 * REDUCER
 */
function getIdx(idx) {
  return idx
    ? idx
    : 0
}

export default function (state = defaultFixtures, action) {
  var newState = Object.assign({}, state)
  switch (action.type) {
    case STOCK_NAME:
      newState[getIdx(action.idx)].fixtureName = action.fixtureName
      break
    case STOCK_PREFIX:
      newState[getIdx(action.idx)].prefix = action.prefix
      break
    case STOCK_CHANNEL:
      newState[getIdx(action.idx)].channel = action.channel
      break
    case STOCK_LENS:
      newState[getIdx(action.idx)].lens = action.lens
      break
    case STOCK_INTENSITY:
      newState[getIdx(action.idx)].intensity = action.intensity
      break
    case STOCK_CCT:
      newState[getIdx(action.idx)].cct = action.cct
      break
    case STOCK_COATING:
      newState[getIdx(action.idx)].powderCoating = action.coating
      break
    case STOCK_DIMMING:
      newState[getIdx(action.idx)].dimming = action.dimming
      break
    case STOCK_ANOTHER_FIXTURE:
      newState[getIdx(action.idx)] = action.fixture
      break
    default:
      break
  }

  newState[getIdx(action.idx)].partNumber = calculatePartNumber(newState[getIdx(action.idx)])

  return newState
}
