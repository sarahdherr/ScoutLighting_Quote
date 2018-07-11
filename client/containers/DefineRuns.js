import React from 'react'
import {RunTable} from '../components'
import {connect} from 'react-redux'

class DefineRuns extends React.Component {
  render () {
    return (
      <div>
        <h1 className='title'><strong>DEFINE RUNS</strong></h1>
        <RunTable intensity={this.props.intensity} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    prefix: state.fixture[0].prefix,
    channel: state.fixture[0].channel,
    lens: state.fixture[0].lens,
    intensity: state.fixture[0].intensity,
    cct: state.fixture[0].cct,
    coating: state.fixture[0].coating,
    dimming: state.fixture[0].dimming
  }
}

const mapDispatch = null

export default connect(mapState, mapDispatch)(DefineRuns)
