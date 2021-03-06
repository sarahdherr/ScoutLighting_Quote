import React from 'react'
import {RunTable} from '../components'
import {connect} from 'react-redux'

class DefineRuns extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <h1 className='title'><strong>DEFINE RUNS</strong></h1>
        <RunTable intensity={this.props.intensity} idx={this.props.idx} />
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  return {
    prefix: state.fixture[ownProps.idx].prefix,
    channel: state.fixture[ownProps.idx].channel,
    lens: state.fixture[ownProps.idx].lens,
    intensity: state.fixture[ownProps.idx].intensity,
    cct: state.fixture[ownProps.idx].cct,
    coating: state.fixture[ownProps.idx].coating,
    dimming: state.fixture[ownProps.idx].dimming
  }
}

const mapDispatch = null

export default connect(mapState, mapDispatch)(DefineRuns)
