import React from 'react'

class DefinePatternValues extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      valid: true,
      invalidMsg: '',
      feed: 'End Feed',
      qty: 0
    }
    this.handleFeed = this.handleFeed.bind(this)
    this.handleQty = this.handleQty.bind(this)
  }

  handleQty (evt) {
    this.setState({ qty: evt.target.value })
  }

  handleFeed (evt) {
    this.setState({feed: evt.target.value})
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
            <p className='runmodal-input-text'>Feed:</p>
            <select value={this.state.feed} onChange={this.handleFeed}>
              <option>End Feed</option>
              <option>Rear Feed</option>
              <option>Side Feed</option>
            </select>
          </div>
        </div>
        <button onClick={this.onNext} type='submit' className='runmodal-next-btn'>Finish</button>
      </div>
    )
  }
}

export default DefinePatternValues
