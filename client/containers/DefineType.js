import React from 'react'
import {connect} from 'react-redux'
import {setPrefix, setChannel, setLens, setIntensity, setCct, setCoating, setDimming} from '../store'

class DefineType extends React.Component {
  render () {
    return (
      <div>
        <h1 className='title'><strong>DEFINE TYPE</strong></h1>

        <div className='fixtype-container'>
          <div className='fixtype-item-container'>
            <p className='fixtype-item-label'>Fixture Prefix:</p>
            <select className='fixtype-item-input' name='prefix' value={this.props.prefix} onChange={(evt) => this.props.handlePrefix(evt.target.value)} >
              <option>SS</option>
            </select>
          </div>

          <div className='fixtype-item-container'>
            <p className='fixtype-item-label'>Channel:</p>
            <select
                className='fixtype-item-input'
                name='channel'
                value={this.props.channel}
                onChange={(evt) => {
                  this.props.handleChannel(evt.target.value)
                }} >
              <option></option>
              <option>E - None</option>
              <option>S - Surface Mount</option>
              <option>C - Corner</option>
            </select>
          </div>

          <div className='fixtype-item-container'>
            <p className='fixtype-item-label'>Lens:</p>
            <select
                className='fixtype-item-input'
                name='lens'
                value={this.props.lens}
                onChange={(evt) => {
                  this.props.handleLens(evt.target.value)
                }} >
              <option></option>
              <option>FM - Flat Milky</option>
              <option>FF - Flat Frosted</option>
            </select>
          </div>

          <div className='fixtype-item-container'>
            <p className='fixtype-item-label'>Intensity:</p>
            <select
                className='fixtype-item-input'
                name='intensity'
                value={this.props.intensity}
                onChange={(evt) => {
                  this.props.handleIntensity(evt.target.value)
                }} >
              <option></option>
              <option>2.5</option>
              <option>5.0</option>
              <option>10.0</option>
            </select>
          </div>

          <div className='fixtype-item-container'>
            <p className='fixtype-item-label'>CCT:</p>
            <select
                className='fixtype-item-input'
                name='cct'
                value={this.props.cct}
                onChange={(evt) => {
                  this.props.handleCct(evt.target.value)
                }} >
              <option></option>
              <option>22 - 2200K</option>
              <option>27 - 2700K</option>
              <option>30 - 3000K</option>
              <option>35 - 3500K</option>
              <option>41 - 4100K</option>
              <option>55 - 5500K</option>
            </select>
          </div>

          <div className='fixtype-item-container'>
            <p className='fixtype-item-label'>Powder Coating:</p>
            <select
                className='fixtype-item-input'
                name='powderCoating'
                value={this.props.coating}
                onChange={(evt) => {
                  this.props.handleCoating(evt.target.value)
                }} >
              <option></option>
              <option>None</option>
              <option>Matte White</option>
              <option>Matte Black</option>
              <option>Custom</option>
            </select>
          </div>

          <div className='fixtype-item-container'>
            <p className='fixtype-item-label'>Control/Dimming:</p>
            <select className='fixtype-item-input' name='dimming' value={this.props.dimming} onChange={(evt) => this.props.handleDimming(evt.target.value)} >
              <option></option>
              <option>None</option>
              <option>0 - 10</option>
              <option>MLV</option>
              <option>DMX</option>
            </select>
          </div>
        </div>
        <p className='partnumber-text'>Part #: {this.props.partNumber}</p>
        {/* <button onClick={() => this.props.handleSubmit(this.state)}>Send to database</button> */}
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
    dimming: state.fixture.dimming,
    partNumber: state.fixture.partNumber
  }
}

const mapDispatch = dispatch => {
  return {
    handlePrefix (prefix) {
      dispatch(setPrefix(prefix))
    },
    handleChannel (channel) {
      dispatch(setChannel(channel))
    },
    handleLens (lens) {
      dispatch(setLens(lens))
    },
    handleIntensity (intensity) {
      dispatch(setIntensity(intensity))
    },
    handleCct (cct) {
      dispatch(setCct(cct))
    },
    handleCoating (coating) {
      dispatch(setCoating(coating))
    },
    handleDimming (dimming) {
      dispatch(setDimming(dimming))
    }
  }
}

export default connect(mapState, mapDispatch)(DefineType)
