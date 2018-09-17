import React from 'react'
import {connect} from 'react-redux'
import Modal from 'react-responsive-modal'

import DefineRunInitial from '../components/DefineRun/DefineRunInitial'
import DefineRunStraightLength from '../components/DefineRun/DefineRunStraightLength'

class DefineRuns extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      showValues: false,
      innerControl: DefineRunInitial
    }
    this.onOpenModal = this.onOpenModal.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
    this.onNext = this.onNext.bind(this)
    this.onComplete = this.onComplete.bind(this)
  }

  onOpenModal () {
    this.setState({ open: true })
  }

  onCloseModal () {
    this.setState({ open: false })
  }

  onNext (val) {
    console.log('DefineRun', val)
    this.setState(val)
    this.setState({ innerControl: DefineRunStraightLength })
  }

  onComplete (val) {
    this.setState({...val, showValues: true})
    this.onCloseModal()
  }

  render () {
    console.log(this.state)
    return (
      <div>
        <h1 className='title'><strong>DEFINE RUNS</strong></h1>
        <button type='submit' onClick={this.onOpenModal} className='runmodal-addrun-btn'>Add Run</button>
        <Modal open={this.state.open} onClose={this.onCloseModal} center className='runmodal'>
          {<this.state.innerControl onNext={this.onNext} onComplete={this.onComplete} />}
        </Modal>
        {
          this.showValues
          ? <div>
            <p>Run type: {this.state.runType}</p>
            <p>Length: {this.state.lengthFt} feet {this.state.lengthIn} inches</p>
            <p>Quantity: {this.state.quantity}</p>
          </div>
          : null
        }
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
