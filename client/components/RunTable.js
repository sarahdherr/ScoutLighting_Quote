import React from 'react'
import {connect} from 'react-redux'
import RunRow from './RunRow'
import {addAnotherRun} from '../store'

const RunTable = (props) => {
  const runs = props.runs[props.idx]
  return (
    <div className='fixtype-container'>
      <table className='channeltbl'>
        <thead>
          <tr className='channeltbl-header'>
            {/* <th className='channeltbl-header-cell'>Group</th> */}
            <th className='channeltbl-header-cell'>Quantity</th>
            <th className='channeltbl-header-cell'>Length (feet)</th>
            <th className='channeltbl-header-cell'>Length (inches)</th>
            <th className='channeltbl-header-cell'>Run Wattage</th>
            <th className='channeltbl-header-cell'>Total Wattage</th>
            <th className='channeltbl-header-cell'>Field trimmable?</th>
            <th className='channeltbl-header-cell'>Symmetrical?</th>
          </tr>
        </thead>
        <tbody>
          {
            runs.map((run, idx) =>
              <RunRow key={idx}
                fixtureIdx={props.idx}
                idx={idx}
                intensity={props.intensity ? Number(props.intensity) : 0}
                run={run} />
            )
          }
        </tbody>
      </table>
      <div className='channeltbl-btn'>
        <button type='submit'
          className='channeltbl-add-btn'
          onClick={() => props.addAnotherRun(props.idx)}>
            Add Run
          </button>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    runs: state.run
  }
}

const mapDispatch = dispatch => {
  return {
    addAnotherRun (idx) {
      dispatch(addAnotherRun(idx))
    }
  }
}

export default connect(mapState, mapDispatch)(RunTable)
