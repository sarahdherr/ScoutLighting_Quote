import React from 'react'

export default class RunRow extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      group: '',
      quantity: 0,
      lengthFt: 0,
      lengthIn: 0,
      trimmable: false,
      symmetrical: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.runWatts = this.runWatts.bind(this)
    this.totalWatts = this.totalWatts.bind(this)
  }

  handleChange (evt) {
    let stateObj = {}
    stateObj[evt.target.name] = Number(evt.target.value) * 1
    this.setState(stateObj)
  }

  handleKeyDown (evt, name) {
    var key = evt.key
    var stateKey = evt.target.name
    if (key === 'ArrowUp' || key === 'ArrowDown') {
      var stateObj = {}
      var increment = key === 'ArrowUp'
        ? 1
        : (this.state[stateKey] <= 0 ? 0 : -1);
      stateObj[stateKey] = Number(this.state[stateKey]) + increment
      this.setState(stateObj)
    }
  }

  runWatts () {
    var x = (this.props.intensity * (this.state.lengthFt + (this.state.lengthIn / 12)))
    return x
  }

  totalWatts () {
    var runWatts = this.runWatts()
    var x = (runWatts * this.state.quantity)
    return x
  }

  render () {
    return (
      <tr>
        <td className='channeltbl-body'>
          <input name='group' className='channeltbl-body-input'
            value={this.state.group}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown} />
        </td>
        <td className='channeltbl-body'>
          <input name='quantity' className='channeltbl-body-input'
            value={this.state.quantity}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown} />
        </td>
        <td className='channeltbl-body'>
          <input name='lengthFt' className='channeltbl-body-input'
            value={this.state.lengthFt}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown} />
        </td>
        <td className='channeltbl-body'>
          <input
            name='lengthIn'
            className='channeltbl-body-input'
            value={this.state.lengthIn}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown} />
        </td>
        <td className='channeltbl-body'>
          <input
            name='runWatts'
            className='channeltbl-body-input'
            value={this.runWatts()} />
        </td>
        <td className='channeltbl-body'>
          <input
            name='totalWatts'
            className='channeltbl-body-input channeltbl-totalWatts'
            value={this.totalWatts()} />
        </td>
        <td className='channeltbl-body'>
          <label className='channeltbl-checkbox'>
            <input
              name='timmable'
              value={this.state.trimmable}
              type='checkbox'
              onChange={this.handleChange} />
          </label>
        </td>
        <td className='channeltbl-body'>
          <label className='channeltbl-checkbox'>
            <input
              name='symmetrical'
              value={this.state.symmetrical}
              type='checkbox'
              onChange={this.handleChange} />
          </label>
        </td>
      </tr>
    )
  }
}
