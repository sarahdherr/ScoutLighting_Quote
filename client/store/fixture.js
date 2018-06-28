import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const STOCK_PREFIX = 'STOCK_PREFIX'
const STOCK_CHANNEL = 'STOCK_CHANNEL'
const STOCK_LENS = 'STOCK_LENS'
const STOCK_INTENSITY = 'STOCK_INTENSITY'
const STOCK_CCT = 'STOCK_CCT'
const STOCK_DIMMING = 'STOCK_DIMMING'
const STOCK_COATING = 'STOCK_COATING'

/**
 * INITIAL STATE
 */
const defaultFixture = {
  prefix: 'SS',
  channel: '',
  lens: '',
  intensity: '',
  cct: '',
  dimming: '',
  coating: '',
  partNumber: ''
}

/**
 * ACTION CREATORS
 */
const stockPrefix = prefix => ({type: STOCK_PREFIX, prefix})
const stockChannel = channel => ({type: STOCK_CHANNEL, channel})
const stockLens = lens => ({type: STOCK_LENS, lens})
const stockIntensity = intensity => ({type: STOCK_INTENSITY, intensity})
const stockCct = cct => ({type: STOCK_CCT, cct})
const stockDimming = dimming => ({type: STOCK_DIMMING, dimming})
const stockCoating = coating => ({type: STOCK_COATING, coating})

/**
 * THUNK CREATORS
 */
export const setPrefix = (prefix) => async dispatch => {
  try {
    dispatch(stockPrefix(prefix))
  } catch (err) {
    console.log(err)
  }
}

export const setChannel = (channel) => async dispatch => {
  try {
    dispatch(stockChannel(channel))
  } catch (err) {
    console.log(err)
  }
}

export const setLens = (lens) => async dispatch => {
  try {
    dispatch(stockLens(lens))
  } catch (err) {
    console.log(err)
  }
}

export const setIntensity = (intensity) => async dispatch => {
  try {
    dispatch(stockIntensity(intensity))
  } catch (err) {
    console.log(err)
  }
}

export const setCct = (cct) => async dispatch => {
  try {
    dispatch(stockCct(cct))
  } catch (err) {
    console.log(err)
  }
}

export const setDimming = (dimming) => async dispatch => {
  try {
    dispatch(stockDimming(dimming))
  } catch (err) {
    console.log(err)
  }
}

export const setCoating = (coating) => async dispatch => {
  try {
    dispatch(stockCoating(coating))
  } catch (err) {
    console.log(err)
  }
}

export const saveFixture = (fixture) => async dispatch => {
  let res
  try {
    // /fixtures routes still to write
    res = await axios.post(`http://localhost:8080/api/fixtures`, {fixture})
  } catch (err) {
    console.error(err)
  }
}


const calculatePartNumber = (state) => {
  let prefix = state.prefix
  let channel = state.channel.split(' - ')[0]
  let lens = state.lens.split(' - ')[0]
  let intensity = Number(state.intensity)
  let cct = state.cct.split(' - ')[0]

  let partNumber = `${prefix}${channel}${lens}${(intensity > 0) ? intensity : ''}${cct}`
  return partNumber
}
/**
 * REDUCER
 */
export default function (state = defaultFixture, action) {
  var newState = Object.assign({}, state)
  switch (action.type) {
    case STOCK_PREFIX:
      newState.prefix = action.prefix
      break
    case STOCK_CHANNEL:
      newState.channel = action.channel
      break
    case STOCK_LENS:
      newState.lens = action.lens
      break
    case STOCK_INTENSITY:
      newState.intensity = action.intensity
      break
    case STOCK_CCT:
      newState.cct = action.cct
      break
    case STOCK_COATING:
      newState.coating = action.coating
      break
    case STOCK_DIMMING:
      newState.dimming = action.dimming
      break
    default:
      break
  }
  newState.partNumber = calculatePartNumber(newState)
  return newState
}
