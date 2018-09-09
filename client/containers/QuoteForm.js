import React from 'react'

import DefineJob from './DefineJob'
import DefineTypeRun from './DefineTypeRun'

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
        <DefineTypeRun showTypeRun={!this.state.showNext} />
      </div>
    )
  }
}

export default Quote
