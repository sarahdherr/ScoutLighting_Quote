import React from 'react'
import {connect} from 'react-redux'
import Modal from 'react-responsive-modal'

import DefineRunInitial from '../components/DefineRun/DefineRunInitial'
import DefineRunStraightValues from '../components/DefineRun/DefineRunStraightValues'
import DefinePatternValues from '../components/DefineRun/DefinePatternValues'

class DefineRuns extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      innerControl: DefineRunInitial,
      runs: []
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
    this.setState({ innerControl: DefineRunInitial, open: false, currentRun: {} })
  }

  onNext (val) {
    console.log('DefineRun', val)
    this.setState({currentRun: {...val}}, () => {
      if (this.state.currentRun.runType === 'Straight') {
        this.setState({innerControl: DefineRunStraightValues})
      } else {
        this.setState({innerControl: DefinePatternValues})
      }
    })
  }

  onComplete (val) {
    let newRun = {...this.state.currentRun, ...val}
    let runs = this.state.runs.concat(newRun)
    this.setState({runs: runs})
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
          this.state.runs.length
          ? this.state.runs.map((run, idx) =>
            <div key={idx}>
              <p className='runoutput-header'>Run {idx + 1}</p>
              <div className='runoutput-text-container'>
                <p>Run type: {run.runType}</p>
                <p>Quantity: {run.qty}</p>
                <p>Length: {run.lengthFt}" {run.lengthIn}'</p>
              </div>
            </div>
          )
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
