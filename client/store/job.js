import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_JOB = 'GET_JOB'
const PING_JOB = 'PING_JOB'
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

export const saveJob = (job) => async dispatch => {
  console.log('inside save job')
  let res
  try {
    console.log('did the posting')
    res = await axios.post(`http://localhost:8080/api/jobs`, {job})
  } catch (err) {
    console.log('something went wrong in the post')
    console.error(err)
  }

  // try {
  //   dispatch(stockJob(res.data))
  // } catch (err) {
  //   console.error(err)
  // }
}

/**
 * REDUCER
 */
export default function (state = defaultJob, action) {
  switch (action.type) {
    case PING_JOB:
      return {name: 'Sarah'}
    case GET_JOB:
      return action.job
    default:
      return state
  }
}
