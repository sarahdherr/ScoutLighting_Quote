import React from 'react'
import ReactExport from 'react-data-export'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

const ExcelDownload = (props) => {
  const job = props.job
  function sum (fixture, key) {
    let total = 0
    fixture.map(row => {
      if (typeof row[key] === 'number') {
        total += row[key]
      }
    })
    return total
  }
  var fixNames = Object.keys(props.csvData)

  var sumData = fixNames.map(fixtureName => {
    let length = sum(props.csvData[fixtureName], 'length')
    let zeroTen30W = sum(props.csvData[fixtureName], 'zeroToTen30')
    let zeroTen60W = sum(props.csvData[fixtureName], 'zeroToTen60')
    let zeroTen96W = sum(props.csvData[fixtureName], 'zeroToTen96')
    let mlv = sum(props.csvData[fixtureName], 'MLV')
    let dmx = sum(props.csvData[fixtureName], 'DMX')
    let nonDim = sum(props.csvData[fixtureName], 'None')
    let twoFt = sum(props.csvData[fixtureName], 'twoFt')
    let oneFt = sum(props.csvData[fixtureName], 'oneFt')
    let oneIn = sum(props.csvData[fixtureName], 'oneIn')
    let cornerL = sum(props.csvData[fixtureName], 'cornerLeft')
    let cornerR = sum(props.csvData[fixtureName], 'cornerRight')
    let powerfeed = sum(props.csvData[fixtureName], 'powerfeed')
    let nonfeed = sum(props.csvData[fixtureName], 'nonfeed')
    let mountingKit = sum(props.csvData[fixtureName], 'mountingKit')
    return [fixtureName, length, zeroTen30W, zeroTen60W, zeroTen96W, mlv, dmx, nonDim, twoFt, oneFt, oneIn, cornerL, cornerR, powerfeed, nonfeed, mountingKit]
  })
  const summaryData = [
    { columns: ['Job Info', ''],
      data: [
        ['Name', job.name],
        ['Company', job.company],
        ['Job', job.jobName],
        ['Location', job.location],
        ['Specifier', job.specifier],
        ['Job Type', job.type]
      ]
    },
    { ySteps: 3,
      columns: ['Fixture', 'Length', '0-10 30W', '0-10 60W', '0-10 96W', 'MLV 96', 'DMX 96', 'Non Dim 96', '2 Foot', '1 Foot', '1 Inch', 'Corner Left', 'Corner Right', 'Powerfeed', 'Nonfeed', 'Mounting Kit'],
      data: sumData
    }
  ]
  return (
    <ExcelFile filename={`${props.job.jobName} - ${props.job.specifier}`} element={<button type='submit' className='download-btn'>Download Excel</button>}>
      <ExcelSheet dataSet={summaryData} name='Summary' />
      {Object.keys(props.csvData).map((fixName, idx) =>
        <ExcelSheet key={fixName} data={props.csvData[fixName]} name={`${fixName}`}>
          <ExcelColumn label='Type' value='type' />
          <ExcelColumn label='Length' value='length' />
          <ExcelColumn label='Breakdown' value='breakdown' />
          <ExcelColumn label='Wattage' value='wattage' />
          <ExcelColumn label='0-10 30W' value='zeroToTen30' />
          <ExcelColumn label='0-10 60W' value='zeroToTen60' />
          <ExcelColumn label='0-10 96W' value='zeroToTen96' />
          <ExcelColumn label='MLV 96' value='MLV' />
          <ExcelColumn label='DMX 96' value='DMX' />
          <ExcelColumn label='Non Dim 96' value='None' />
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
  )
}


export default ExcelDownload
