import React from 'react'

class DefineRunStraightValues extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lengthFt: 0,
      lengthIn: 0,
      qty: 0,
      valid: true,
      invalidMsg: ''
    }
    this.handleLengthFt = this.handleLengthFt.bind(this)
    this.handleLengthIn = this.handleLengthIn.bind(this)
    this.handleQty = this.handleQty.bind(this)
    this.onNext = this.onNext.bind(this)
  }

  handleLengthFt (evt) {
    this.setState({ lengthFt: evt.target.value })
  }

  handleLengthIn (evt) {
    this.setState({ lengthIn: evt.target.value })
  }

  handleQty (evt) {
    this.setState({ qty: evt.target.value })
  }

  onNext () {
    if (this.state.lengthFt + this.state.lengthIn === 0)
    {
      console.log('not so fast... (length)')
      this.setState({ valid: false, invalidMsg: 'Please enter numerical length before continueing' })
    }
    else if (!this.state.qty) {
      console.log('not so fast... (qty)')
      this.setState({ valid: false, invalidMsg: 'Please enter numerical quantity before continueing' })

    }
    else
    {
      console.log('proceed...')
      this.setState({ valid: true })
      let sendObj = {}
      sendObj.lengthFt = this.state.lengthFt
      sendObj.lengthIn = this.state.lengthIn
      sendObj.qty = this.state.qty
      this.props.onComplete(sendObj)
    }
  }

  render () {
    return (
      <div className='runmodal-container' >
        <p className='runmodal-header-text'>Select Run Properties</p>
        {
          this.state.valid
            ? null
            : <p className='runmodal-validation-string'>{this.state.invalidMsg}</p>
        }
        <div >
          <div className='runmodal-input-container'>
            <p className='runmodal-input-text' >Quantity:</p>
            <input name='qty' className='' onChange={this.handleQty} value={this.state.qty} className='runmodal-input' />
          </div>
          <div className='runmodal-input-container'>
            <p className='runmodal-input-text'>Length (Ft):</p>
            <input name='length' className='' onChange={this.handleLengthFt} value={this.state.lengthFt} className='runmodal-input' />
          </div>
          <div className='runmodal-input-container'>
            <p className='runmodal-input-text'>Length (In):</p>
            <input name='length' className='' onChange={this.handleLengthIn} value={this.state.lengthIn} className='runmodal-input' />
          </div>
        </div>
        <button onClick={this.onNext} type='submit' className='runmodal-next-btn'>Finish</button>
      </div>
    )
  }
}

export default DefineRunStraightValues
