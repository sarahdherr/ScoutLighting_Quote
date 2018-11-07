import React from 'react'
import {connect} from 'react-redux'
import DefineType from './DefineType'
import DefineRuns from './DefineRuns'
import ExcelDownload from '../components/ExcelDownload'
import {addAnotherFixture, stockRunsForFixture, saveJob} from '../store'

class DefineTypeRun extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fixtures: [true]
    }
    this.handleCollapse = this.handleCollapse.bind(this)
    this.handleAddFixture = this.handleAddFixture.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  handleCollapse (idx) {
    let newFixtures = this.state.fixtures
    newFixtures[idx] = !this.state.fixtures[idx]
    this.setState({fixtures: newFixtures})
  }

  handleAddFixture (evt) {
    evt.preventDefault()
    this.props.addAnotherFixture(this.state.fixtures.length)
    let newFixtures = this.state.fixtures.map(fix => false)
    newFixtures.push(true)
    this.setState({fixtures: newFixtures})
  }

  handleSave (evt) {
    evt.preventDefault()
    this.props.saveJob(this.props.job, this.props.fixtures, this.props.runs)
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
                  <DefineRuns idx={idx} />
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
            <button type='submit'
              className='submit-quote-btn'
              onClick={this.handleAddFixture}>
              Add Another Type
            </button>
            <button type='submit'
              className='submit-quote-btn'
              onClick={this.handleSave}>
              Save
            </button>
            {
              Object.keys(this.props.csvData).length
              ? <ExcelDownload job={this.props.job} fixtureNames={this.props.fixtureName} csvData={this.props.csvData} />
              : null
            }
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
    fixtureName: getAllFixtureNames(state.fixture),
    fixtures: getAllFixtures(state.fixture),
    job: state.job,
    runs: getAllRuns(state.run),
    csvData: state.csv
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

function getAllFixtures (fixtures) {
  let keys = Object.keys(fixtures)
  return keys.map(key => fixtures[key])
}

function getAllRuns (runs) {
  let keys = Object.keys(runs)
  return keys.map(key => runs[key])
}

const mapDispatch = dispatch => {
  return {
    addAnotherFixture (idx) {
      dispatch(addAnotherFixture(idx))
      dispatch(stockRunsForFixture(idx))
    },
    saveJob (job, fixtures, runs) {
      dispatch(saveJob(job, fixtures, runs))
    }
  }
}

export default connect(mapState, mapDispatch)(DefineTypeRun)
