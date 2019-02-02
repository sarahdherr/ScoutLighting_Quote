import React from 'react'
import {connect} from 'react-redux'
import {setPrefix, setName, setChannel, setLens, setIntensity, setCct, setCoating, setCustomCoating, setDimming, setLocation} from '../store'

const DefineType = (props) => {
  return (
    <div className='define-fixtype-container'>
      <h1 className='title'><strong>DEFINE TYPE</strong></h1>
      <div className='fixtype-name-container'>
        <p className='fixtype-name-label'>Fixture Type:</p>
        <input className='fixtype-name-input fixtype-radio-input'
          onChange={(evt) => props.handleNameChange(props.idx, evt.target.value)}
          value={props.fixtureName} />
        <p className='fixtype-name-label'>Fixture Location:</p>
        <input className='fixtype-name-input fixtype-radio-input'
          onChange={(evt) => props.handleLocationChange(props.idx, evt.target.value)}
          value={props.fixtureLocation} />
      </div>
      <div className='fixtype-container'>
        <div className='fixtype-item-container'>
          <p className='fixtype-item-label'>Fixture Prefix:</p>
          <div>
            <label className='fixtype-radio-label'>
              <input
                type='radio'
                value='SS'
                className='fixtype-item-input fixtype-radio-input'
                name='prefix'
                onChange={(evt) => props.handlePrefix(props.idx, evt.target.value)}
                checked={props.prefix === 'SS'} />
              <p className='fixtype-radio-text'>SS</p>
            </label>
          </div>
        </div>

        <div className='fixtype-item-container'>
          <p className='fixtype-item-label'>Channel:</p>
          {['E - None', 'S - Surface Mount', 'C - Corner'].map((channel, idx) =>
            <div key={idx}>
              <label className='fixtype-radio-label'>
                <input
                  type='radio'
                  className='fixtype-item-input fixtype-radio-input'
                  name='channel'
                  value={channel}
                  onChange={(evt) => {
                    props.handleChannel(props.idx, evt.target.value)
                  }}
                  checked={props.channel === channel} />
                  <p className='fixtype-radio-text'>{channel}</p>
              </label>
            </div>
          )}
        </div>

        <div className='fixtype-item-container'>
          <p className='fixtype-item-label'>Lens:</p>
          {['FM - Flat Milky', 'FF - Flat Frosted', 'G - Glazer Optics'].map((lens, idx) =>
            <div key={idx}>
              <label className='fixtype-radio-label'>
                <input
                  type='radio'
                  className='fixtype-item-input fixtype-radio-input'
                  name='lens'
                  value={lens}
                  onChange={(evt) => {
                    props.handleLens(props.idx, evt.target.value)
                  }}
                  checked={props.lens === lens} />
                  <p className='fixtype-radio-text'>{lens}</p>
              </label>
            </div>
          )}
        </div>

        <div className='fixtype-item-container'>
          <p className='fixtype-item-label'>Intensity:</p>
          {['2.5', '5.0', '10.0'].map((int, idx) =>
            <div key={idx}>
              <label className='fixtype-radio-label'>
                <input
                  type='radio'
                  className='fixtype-item-input fixtype-radio-input'
                  name='intensity'
                  value={int}
                  onChange={(evt) => {
                    props.handleIntensity(props.idx, evt.target.value)
                  }}
                  checked={props.intensity === int} />
                <p className='fixtype-radio-text'>{int}</p>
              </label>
            </div>
          )}
        </div>

        <div className='fixtype-item-container'>
          <p className='fixtype-item-label'>CCT:</p>
          {['22 - 2200K', '27 - 2700K', '30 - 3000K', ' 35 - 3500K', '41 - 4100K', '55 - 5500K'].map((cct, idx) =>
            <div key={idx}>
              <label className='fixtype-radio-label'>
                <input
                  type='radio'
                  className='fixtype-item-input fixtype-radio-input'
                  name='cct'
                  value={cct}
                  onChange={(evt) => {
                    props.handleCct(props.idx, evt.target.value)
                  }}
                  checked={props.cct === cct} />
                <p className='fixtype-radio-text'>{cct}</p>
              </label>
            </div>
          )}
        </div>

        <div className='fixtype-item-container'>
          <p className='fixtype-item-label'>Powder Coating:</p>
          {['None', 'Matte White', 'Matte Black', 'Custom'].map((powderCoating, idx) =>
            <div key={idx}>
              <label className='fixtype-radio-label'>
                <input
                  type='radio'
                  className='fixtype-item-input fixtype-radio-input'
                  name='powderCoating'
                  value={powderCoating}
                  onChange={(evt) => {
                    props.handleCoating(props.idx, evt.target.value)
                  }}
                  checked={props.powderCoating === powderCoating} />
                <p className='fixtype-radio-text'>{powderCoating}</p>
              </label>
            </div>
          )}
          {
            props.powderCoating === 'Custom'
              ? <input className='fixtype-name-input fixtype-radio-input'
                  onChange={(evt) => props.handleCustomCoating(props.idx, evt.target.value)}
                  value={props.customCoating}
                  placeholder='hex color' />
              : null
          }
        </div>

        <div className='fixtype-item-container'>
          <p className='fixtype-item-label'>Control/Dimming:</p>
          {['None', '0-10', 'MLV', 'DMX'].map((dimming, idx) =>
            <div key={idx}>
              <label className='fixtype-radio-label'>
                <input
                  type='radio'
                  className='fixtype-item-input fixtype-radio-input'
                  name='dimming'
                  value={dimming}
                  onChange={(evt) => {
                    props.handleDimming(props.idx, evt.target.value)
                  }}
                  checked={props.dimming === dimming} />
                <p className='fixtype-radio-text'>{dimming}</p>
              </label>
            </div>
          )}
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
    fixtureLocation: state.fixture[ownProps.idx].fixtureLocation,
    prefix: state.fixture[ownProps.idx].prefix,
    channel: state.fixture[ownProps.idx].channel,
    lens: state.fixture[ownProps.idx].lens,
    intensity: state.fixture[ownProps.idx].intensity,
    cct: state.fixture[ownProps.idx].cct,
    powderCoating: state.fixture[ownProps.idx].powderCoating,
    customCoating: state.fixture[ownProps.idx].customCoating,
    dimming: state.fixture[ownProps.idx].dimming,
    partNumber: state.fixture[ownProps.idx].partNumber
  }
}

const mapDispatch = dispatch => {
  return {
    handleNameChange (idx, fixtureName) {
      dispatch(setName(idx, fixtureName))
    },
    handleLocationChange (idx, location) {
      dispatch(setLocation(idx, location))
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
    handleCustomCoating (idx, customCoating) {
      dispatch(setCustomCoating(idx, customCoating))
    },
    handleDimming (idx, dimming) {
      dispatch(setDimming(idx, dimming))
    }
  }
}

export default connect(mapState, mapDispatch)(DefineType)
