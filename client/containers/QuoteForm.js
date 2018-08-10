import React from 'react'
import {CSVLink} from 'react-csv'

import DefineJob from './DefineJob'
import DefineTypeRun from './DefineTypeRun'

const headers = [
  {label: 'Type', key: 'type'},
  {label: 'Length', key: 'length'},
  {label: 'Breakdown', key: 'breakdown'},
  {label: 'Wattage', key: 'wattage'},
  {label: 'Driver', key: 'driver'},
  {label: '2 Foot', key: 'twoFt'},
  {label: '1 Foot', key: 'oneFt'},
  {label: '1 Inch', key: 'oneInch'},
  {label: 'Corner Left', key: 'cornerLeft'},
  {label: 'Corner Right', key: 'cornerRight'},
  {label: 'Power Feed', key: 'powerfeed'},
  {label: 'Non Feed', key: 'nonfeed'},
  {label: 'Mounting Kit', key: 'mountingKit'}
]

const data = [
  { type: 'LC2',
    length: 65,
    breakdown: 6,
    wattage: 30,
    driver: 1,
    twoFt: 3,
    oneFt: 0,
    oneInch: 0,
    cornerLeft: 0,
    cornerRight: 0,
    powerfeed: 1,
    nonfeed: 0,
    mountingKit: 1
  },
  {
    breakdown: 6,
    wattage: 30,
    twoFt: 3,
    oneFt: 0,
    oneInch: 0,
    cornerLeft: 0,
    cornerRight: 0,
    powerfeed: 0,
    nonfeed: 0,
    mountingKit: 1
  }
]

class Quote extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showNext: true
    }
    this.handleNext = this.handleNext.bind(this)
  }

  handleNext () {
    this.setState({ showNext: !this.state.showNext })
  }

  render () {
    return (
      <div>
        <DefineJob showNext={this.state.showNext} handleNext={this.handleNext} />
        {/*
        <CSVLink data={data}
          headers={headers}
          filename='my-file.csv'
          className='btn btn-primary'
          target='_blank'>
            Download me
        </CSVLink>*/}
        <DefineTypeRun showTypeRun={!this.state.showNext} />
      </div>
    )
  }
}

export default Quote
