import React from 'react'
import {connect} from 'react-redux'
import {setRuns} from '../store'

class RunRow extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleSetStore = this.handleSetStore.bind(this)
    this.runWatts = this.runWatts.bind(this)
    this.totalWatts = this.totalWatts.bind(this)
  }

  handleChange (evt) {
    let stateObj = {}

    if (evt.target.name !== 'trimmable' && evt.target.name !== 'symmetrical') {
      stateObj[evt.target.name] = Number(evt.target.value) * 1
    } else {
      stateObj[evt.target.name] = !!evt.target.value
    }

    this.handleSetStore(stateObj)
  }

  handleKeyDown (evt, name) {
    var key = evt.key
    var stateKey = evt.target.name
    if (key === 'ArrowUp' || key === 'ArrowDown') {
      var stateObj = {}
      var increment = key === 'ArrowUp'
        ? 1
        : (this.props.run[stateKey] <= 0 ? 0 : -1);
      stateObj[stateKey] = Number(this.props.run[stateKey]) + increment
      this.handleSetStore(stateObj)
    }
  }

  handleSetStore (stateObj) {
    let runs = this.props.runs.map((currentRun, idx) =>
      idx === this.props.idx
        ? Object.assign({}, currentRun, stateObj)
        : currentRun
    )

    this.props.setRuns(this.props.fixtureIdx, runs)
  }

  // helper functions for watt calculations:
  runWatts () {
    var x = (this.props.intensity * (this.props.run.lengthFt + (this.props.run.lengthIn / 12)))
    return x
  }

  totalWatts () {
    var runWatts = this.runWatts()
    var x = (runWatts * this.props.run.quantity)
    return x
  }

  render () {
    let run = this.props.run
    return (
      <tr>
        {/* <td className='channeltbl-body'>
          <input name='group' className='channeltbl-body-input'
            value={run.group}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown} />
        </td> */}
        <td className='channeltbl-body'>
          <input name='quantity' className='channeltbl-body-input'
            value={run.quantity}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown} />
        </td>
        <td className='channeltbl-body'>
          <input name='lengthFt' className='channeltbl-body-input'
            value={run.lengthFt}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown} />
        </td>
        <td className='channeltbl-body'>
          <input
            name='lengthIn'
            className='channeltbl-body-input'
            value={run.lengthIn}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown} />
        </td>
        <td className='channeltbl-body'>
          <input
            name='runWatts'
            className='channeltbl-body-input channeltbl-totalWatts'
            value={`${Math.round((this.runWatts() * 100) / 100)} W`} />
        </td>
        <td className='channeltbl-body'>
          <input
            name='totalWatts'
            className='channeltbl-body-input channeltbl-totalWatts'
            value={`${Math.round((this.totalWatts() * 100) / 100)} W`} />
        </td>
        {/* <td className='channeltbl-body'>
          <label className='channeltbl-checkbox'>
            <input
              name='trimmable'
              value={run.trimmable}
              type='checkbox'
              onChange={this.handleChange} />
          </label>
        </td>
        <td className='channeltbl-body'>
          <label className='channeltbl-checkbox'>
            <input
              name='symmetrical'
              value={run.symmetrical}
              type='checkbox'
              onChange={this.handleChange} />
          </label>
        </td> */}
      </tr>
    )
  }
}

const mapState = (state, ownProps) => {
  return {
    runs: state.run[ownProps.fixtureIdx]
  }
}

const mapDispatch = dispatch => {
  return {
    setRuns (fixIdx, runs) {
      dispatch(setRuns(fixIdx, runs))
    }
  }
}

export default connect(mapState, mapDispatch)(RunRow)
