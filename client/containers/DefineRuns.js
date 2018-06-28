import React from 'react'
import {RunTable} from '../components'
import {connect} from 'react-redux'

class DefineRuns extends React.Component {
  render () {
    return (
      <div>
        <h1 className='title'><strong>DEFINE JOB</strong></h1>
        <RunTable intensity={this.props.intensity} />
      </div>
    )
  }
}
const mapState = state => {
  return {
    prefix: state.fixture.prefix,
    channel: state.fixture.channel,
    lens: state.fixture.lens,
    intensity: state.fixture.intensity,
    cct: state.fixture.cct,
    coating: state.fixture.coating,
    dimming: state.fixture.dimming
  }
}

const mapDispatch = null

export default connect(mapState, mapDispatch)(DefineRuns)
