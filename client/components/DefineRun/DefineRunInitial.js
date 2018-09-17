import React from 'react'

class DefineRunInitial extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      runType: '',
      valid: true
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.onNext = this.onNext.bind(this)
  }

  handleSelect (runType) {
    this.setState({ runType })
  }

  onNext () {
    if (this.state.runType === '')
    {
      this.setState({ valid: false })
    }
    else
    {
      this.setState({ valid: true })
      let sendObj = {}
      sendObj.runType = this.state.runType
      this.props.onNext(sendObj)
    }
  }

  render () {
    return (
      <div className='runmodal-container' >
        <p className='runmodal-header-text'>Select Run Type</p>
        {
          this.state.valid
            ? null
            : <p className='runmodal-validation-string'>Please select run type before moving on</p>
        }
        <div className='runmodal-option-container'>
          <div>
            <p className='runmodal-option-text'>Straight</p>
            <input type='radio' name='runtype' className='runmodal-option-radio' onChange={() => this.handleSelect('Straight')} />
          </div>
          <div>
            <p className='runmodal-option-text' >Pattern</p>
            <input type='radio' name='runtype' className='runmodal-option-radio' onChange={() => this.handleSelect('Pattern')} />
          </div>
        </div>
        <button onClick={this.onNext} type='submit' className='runmodal-next-btn'>Next</button>
      </div>
    )
  }
}

export default DefineRunInitial
