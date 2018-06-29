import React from 'react'

import DefineJob from './DefineJob'
import DefineType from './DefineType'
import DefineRuns from './DefineRuns'

const QuoteForm = (props) =>
  <div>
    <DefineJob />
    <div className='fixture-type-container'>
      <DefineType />
      <DefineRuns />
    </div>
  </div>

export default QuoteForm
