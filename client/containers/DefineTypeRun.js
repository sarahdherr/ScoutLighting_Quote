import React from 'react'
import {connect} from 'react-redux'
import DefineType from './DefineType'
import DefineRuns from './DefineRuns'
import {addAnotherFixture} from '../store'

class DefineTypeRun extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fixtures: [true]
    }
    this.handleCollapse = this.handleCollapse.bind(this)
    this.handleAddFixture = this.handleAddFixture.bind(this)
  }

  handleCollapse (idx) {
    let newFixtures = this.state.fixtures
    newFixtures[idx] = !this.state.fixtures[idx]
    this.setState({fixtures: newFixtures})
  }

  handleAddFixture (evt) {
    evt.preventDefault()
    this.props.addAnotherFixture()
    let newFixtures = this.state.fixtures
    newFixtures.push(true)
    this.setState({fixtures: newFixtures})
  }

  render () {
    if (this.props.showTypeRun) {
      return (
        <div>
          <div>
            {
              this.state.fixtures.map((fix, idx) =>
                fix
                ? <div key={idx} className='fixture-type-container'>
                    <div className='fixtype-compress'>
                      <span onClick={() => this.handleCollapse(idx)} className='fas fa-minus-square fixtype-compress-icon' />
                    </div>
                    <DefineType idx={idx} />
                    <DefineRuns />
                  </div>
                : <div key={idx} className='fixture-type-container'>
                    <div className='fixtype-compress'>
                      <div className='fixtype-compressed-container'>
                        <p className='fixtype-compressed-name'>Fixture: {this.props.fixtureName[idx]}</p>
                        <p className='fixtype-compressed'>Part #: {this.props.partNumber[idx]}</p>
                      </div>
                      <span onClick={() => this.handleCollapse(idx)} className='fas fa-plus-square fixtype-compress-icon' />
                    </div>
                  </div>
              )
            }
          </div>
          <div>
            <button type='submit' onClick={this.handleAddFixture}>Add Another Type</button>
            <button type='submit'>Save</button>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

const mapState = state => {
  return {
    partNumber: getAllPartNumbers(state.fixture),
    fixtureName: getAllFixtureNames(state.fixture)
  }
}

function getAllPartNumbers (fixtures) {
  let keys = Object.keys(fixtures)
  return keys.map(key => fixtures[key].partNumber)
}

function getAllFixtureNames (fixtures) {
  let keys = Object.keys(fixtures)
  return keys.map(key => fixtures[key].fixtureName)
}

const mapDispatch = dispatch => {
  return {
    addAnotherFixture () {
      dispatch(addAnotherFixture())
    }
  }
}

export default connect(mapState, mapDispatch)(DefineTypeRun)
