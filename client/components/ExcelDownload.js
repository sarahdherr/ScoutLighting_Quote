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
  function getValue (fixture, key) {
    let values = fixture.filter(row => {
      return row[key]
    })
    return values.length
      ? values[0][key]
      : ''
  }
  var sumData2 = fixNames.map(fixtureName => {
    let fixture = props.csvData[fixtureName]
    let name = fixtureName
    let location = getValue(fixture, 'location')
    let partNum = getValue(fixture, 'partNum')
    let cct = getValue(fixture, 'cct')
    let ft = sum(fixture, 'lengthFt')
    let inch = sum(fixture, 'lengthIn')
    let len = sum(fixture, 'length')
    let breakdown = sum(fixture, 'breakdown')
    let check = ''
    let wtsFt = getValue(fixture, 'wattsPerFt')
    let wtsRn = sum(fixture, 'wattage')
    let plugin = sum(fixture, 'notSet')
    let ten30W = sum(fixture, 'zeroToTen30')
    let ten60W = sum(fixture, 'zeroToTen60')
    let ten96W = sum(fixture, 'zeroToTen96')
    let mlv = sum(fixture, 'MLV')
    let dmx = sum(fixture, 'DMX')
    let noDim = sum(fixture, 'None')
    let twoFt = sum(fixture, 'twoFt')
    let oneFt = sum(fixture, 'oneFt')
    let oneIn = sum(fixture, 'oneIn')
    let powerfeed = sum(fixture, 'powerfeed')
    let pucks = sum(fixture, 'pucks')
    let nonFeed = sum(fixture, 'nonfeed')
    let mountingKits = sum(fixture, 'mountingKit')
    let sideFeed = sum(fixture, 'notSet')
    let rearFeed = sum(fixture, 'notSet')
    let cornerL = sum(fixture, 'notSet')
    let cornerR = sum(fixture, 'notSet')
    let jumpers = sum(fixture, 'notSet')
    let optics = sum(fixture, 'optics')
    let powderCoating = sum(fixture, 'powderCoating')

    return [name, location, partNum, cct, ft, inch, len, breakdown, check, wtsFt, wtsRn, plugin, ten30W, ten60W, ten96W, mlv, dmx, noDim, twoFt, oneFt, oneIn, powerfeed, pucks, nonFeed, mountingKits, sideFeed, rearFeed, cornerL, cornerR, jumpers, optics, powderCoating]
  })
  const summaryData = [
    { columns: ['Job Info', ''],
      data: [
        ['Name', job.name],
        ['Email', job.email],
        ['Phone Number', job.phoneNumber],
        ['Company', job.company],
        ['Job', job.jobName],
        ['Location', job.location],
        ['Specifier', job.specifier],
        ['Job Type', job.type]
      ]
    },
    { ySteps: 4,
      columns: ['Type', 'Location', 'Part #', 'CCT', 'Ft', 'In', 'Length', 'Breakdown', 'Check', 'W/FT', 'Run Watt', 'Plugin 24W', '0-10 30W',	'0-10 60W',	'0-10 96W',	'MLV 96',	'DMX 96',	'Non Dim 96', '2  Foot', '1 Foot', '1 Inch', 'Power Feed', 'Pucks', 'Non Feed', 'Mounting Kit', 'Side Feed', 'Rear Feed', 'Corner Left', 'Corner Right', 'Jumpers', 'Optics', 'Powder Coat'],
      data: sumData2
    }
  ]
  return (
    <ExcelFile filename={`${props.job.jobName} - ${props.job.specifier}`} element={<button type='submit' className='download-btn'>Download Excel</button>}>
      <ExcelSheet dataSet={summaryData} name='Summary' />
      {Object.keys(props.csvData).map((fixName, idx) =>
        <ExcelSheet key={fixName} data={props.csvData[fixName]} name={`${fixName}`}>
          <ExcelColumn label='Type' value='type' />
          <ExcelColumn label='Location' value='location' />
          <ExcelColumn label='Part #' value='partNum' />
          <ExcelColumn label='CCT' value='cct' />
          <ExcelColumn label='Ft' value='lengthFt' />
          <ExcelColumn label='Inches' value='lengthIn' />
          <ExcelColumn label='Length' value='length' />
          <ExcelColumn label='Breakdown' value='roundedBreakdown' />
          <ExcelColumn label='Check' value='notSet' />
          <ExcelColumn label='W/FT' value='wattsPerFt' />
          <ExcelColumn label='Run Watt' value='wattage' />
          <ExcelColumn label='Plugin 24W' value='notSet' />
          <ExcelColumn label='0-10 30W' value='zeroToTen30' />
          <ExcelColumn label='0-10 60W' value='zeroToTen60' />
          <ExcelColumn label='0-10 96W' value='zeroToTen96' />
          <ExcelColumn label='MLV 96' value='MLV' />
          <ExcelColumn label='DMX 96' value='DMX' />
          <ExcelColumn label='Non Dim 96' value='None' />
          <ExcelColumn label='2 Foot' value='twoFt' />
          <ExcelColumn label='1 Foot' value='oneFt' />
          <ExcelColumn label='1 Inch' value='oneIn' />
          <ExcelColumn label='Power Feed' value='powerfeed' />
          <ExcelColumn label='Pucks' value='powerfeed' />
          <ExcelColumn label='Non Feed' value='nonfeed' />
          <ExcelColumn label='Mounting Kit' value='mountingKit' />
          <ExcelColumn label='Side Feed' value='notSet' />
          <ExcelColumn label='Rear Feed' value='notSet' />
          <ExcelColumn label='Corner Left' value='notSet' />
          <ExcelColumn label='Corner Right' value='notSet' />
          <ExcelColumn label='Jumpers' value='notSet' />
          <ExcelColumn label='Optics' value='optics' />
          <ExcelColumn label='Powder Coat' value='powderCoating' />
        </ExcelSheet>)
      }
    </ExcelFile>
  )
}


export default ExcelDownload
