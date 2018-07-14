import React from 'react'
import {connect} from 'react-redux'
import {setPrefix, setName, setChannel, setLens, setIntensity, setCct, setCoating, setDimming} from '../store'

const DefineType = (props) => {
  return (
    <div className='define-fixtype-container'>
      <h1 className='title'><strong>DEFINE TYPE</strong></h1>
      <div className='fixtype-name-container'>
        <p className='fixtype-name-label'>Fixture Type:</p>
        <input className='fixtype-name-input'
          onChange={(evt) => props.handleNameChange(props.idx, evt.target.value)}
          value={props.fixtureName} />
      </div>
      <div className='fixtype-container'>
        <div className='fixtype-item-container'>
          <p className='fixtype-item-label'>Fixture Prefix:</p>
          <select className='fixtype-item-input' name='prefix' value={props.prefix} onChange={(evt) => props.handlePrefix(props.idx, evt.target.value)} >
            <option>SS</option>
          </select>
        </div>

        <div className='fixtype-item-container'>
          <p className='fixtype-item-label'>Channel:</p>
          <select
              className='fixtype-item-input'
              name='channel'
              value={props.channel}
              onChange={(evt) => {
                props.handleChannel(props.idx, evt.target.value)
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
              value={props.lens}
              onChange={(evt) => {
                props.handleLens(props.idx, evt.target.value)
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
              value={props.intensity}
              onChange={(evt) => {
                props.handleIntensity(props.idx, evt.target.value)
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
              value={props.cct}
              onChange={(evt) => {
                props.handleCct(props.idx, evt.target.value)
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
              value={props.powderCoating}
              onChange={(evt) => {
                props.handleCoating(props.idx, evt.target.value)
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
          <select className='fixtype-item-input' name='dimming' value={props.dimming} onChange={(evt) => props.handleDimming(props.idx, evt.target.value)} >
            <option></option>
            <option>None</option>
            <option>0 - 10</option>
            <option>MLV</option>
            <option>DMX</option>
          </select>
        </div>
      </div>
      <p className='partnumber-text'>Part #: {props.partNumber}</p>
      {/* <button onClick={() => props.handleSubmit(this.state)}>Send to database</button> */}
    </div>
  )
}

const mapState = (state, ownProps) => {
  return {
    fixtureName: state.fixture[ownProps.idx].fixtureName,
    prefix: state.fixture[ownProps.idx].prefix,
    channel: state.fixture[ownProps.idx].channel,
    lens: state.fixture[ownProps.idx].lens,
    intensity: state.fixture[ownProps.idx].intensity,
    cct: state.fixture[ownProps.idx].cct,
    coating: state.fixture[ownProps.idx].coating,
    dimming: state.fixture[ownProps.idx].dimming,
    partNumber: state.fixture[ownProps.idx].partNumber
  }
}

const mapDispatch = dispatch => {
  return {
    handleNameChange (idx, fixtureName) {
      dispatch(setName(idx, fixtureName))
    },
    handlePrefix (idx, prefix) {
      dispatch(setPrefix(idx, prefix))
    },
    handleChannel (idx, channel) {
      dispatch(setChannel(idx, channel))
    },
    handleLens (idx, lens) {
      dispatch(setLens(idx, lens))
    },
    handleIntensity (idx, intensity) {
      dispatch(setIntensity(idx, intensity))
    },
    handleCct (idx, cct) {
      dispatch(setCct(idx, cct))
    },
    handleCoating (idx, coating) {
      dispatch(setCoating(idx, coating))
    },
    handleDimming (idx, dimming) {
      dispatch(setDimming(idx, dimming))
    }
  }
}

export default connect(mapState, mapDispatch)(DefineType)
