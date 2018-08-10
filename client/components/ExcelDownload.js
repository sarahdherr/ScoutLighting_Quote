import React from 'react'
import ReactExport from 'react-data-export'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

const ExcelDownload = (props) =>
  <ExcelFile filename={`${props.job.jobName} - ${props.job.specifier}`} element={<button type='submit' className='download-btn'>Download Excel</button>}>
    {Object.keys(props.csvData).map((fixName, idx) =>
      <ExcelSheet key={fixName} data={props.csvData[fixName]} name={`${fixName}`}>
        <ExcelColumn label='Type' value='type' />
        <ExcelColumn label='Length' value='length' />
        <ExcelColumn label='Breakdown' value='breakdown' />
        <ExcelColumn label='Wattage' value='wattage' />
        <ExcelColumn label='Driver' value='driver' />
        <ExcelColumn label='2 Foot' value='twoFt' />
        <ExcelColumn label='1 Foot' value='oneFt' />
        <ExcelColumn label='1 Inch' value='oneIn' />
        <ExcelColumn label='Corner Left' value='cornerLeft' />
        <ExcelColumn label='Corner Right' value='cornerRight' />
        <ExcelColumn label='Power Feed' value='powerfeed' />
        <ExcelColumn label='Non Feed' value='nonfeed' />
        <ExcelColumn label='Mounting Kit' value='mountingKit' />
      </ExcelSheet>)
    }
  </ExcelFile>

export default ExcelDownload
