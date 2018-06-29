import React from 'react'
import {stockJob, saveJob} from '../store'
import {connect} from 'react-redux'

class DefineJob extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      company: '',
      jobName: '',
      location: '',
      specifier: '',
      type: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (evt) {
    evt.preventDefault()
    let tempObj = {}
    tempObj[evt.target.name] = evt.target.value
    this.setState(tempObj)
  }

  render () {
    return (
      <div>
        <h1 className='title'><strong>DEFINE JOB</strong></h1>
        <div className='jobinfo-container'>
          <p className='jobinfo-item-label'>Name:</p>
          <input className='jobinfo-item-input' name='name' value={this.state.name} onChange={this.handleChange} />
        </div>
        <div className='jobinfo-container'>
          <p className='jobinfo-item-label'>Company:</p>
          <input className='jobinfo-item-input' name='company' value={this.state.company} onChange={this.handleChange} />
        </div>
        <div className='jobinfo-container'>
          <p className='jobinfo-item-label'>Job Name:</p>
          <input className='jobinfo-item-input' name='jobName' value={this.state.jobName} onChange={this.handleChange} />
        </div>
        <div className='jobinfo-container'>
          <p className='jobinfo-item-label'>Location:</p>
          <input className='jobinfo-item-input' name='location' value={this.state.location} onChange={this.handleChange} />
        </div>
        <div className='jobinfo-container'>
          <p className='jobinfo-item-label'>Specifier:</p>
          <input className='jobinfo-item-input' name='specifier' value={this.state.specifier} onChange={this.handleChange} />
        </div>
        <div className='jobinfo-container'>
          <p className='jobinfo-item-label'>Job Type:</p>
          <select className='jobinfo-item-select' name='type' value={this.state.type} onChange={this.handleChange} >
            <option />
            <option>Hospitality</option>
            <option>Residential</option>
            <option>Commercial</option>
          </select>
        </div>
        <button onClick={() => this.props.handleClick(this.state)}>Next</button>
        {/* <button onClick={() => this.props.handleSubmit(this.state)}>Send to database</button> */}
      </div>
    )
  }
}

const mapState = null

const mapDispatch = dispatch => {
  return {
    handleClick (job) {
      dispatch(stockJob(job))
    },
    handleSubmit (job) {
      dispatch(saveJob(job))
    }
  }
}

export default connect(mapState, mapDispatch)(DefineJob)
