export default function calculateCSV (run, fixture) {
  // console.log('******', run)
  var csvRows = []
  for (let i = 0; i < run.quantity; i++) {
    var totalLength = run.lengthFt
    var firstRow = calculateFirstRow(totalLength, run.type, run.wattsPerFt, run.dimmingType, fixture)
    csvRows.push(firstRow)
    var leftOverFt = totalLength - firstRow.breakdown
    var leftOverWatts = 90 - firstRow.wattage
    while (leftOverFt) {
      var nextRow = calculateNextRow(leftOverFt, run.wattsPerFt, leftOverWatts, run.dimmingType, fixture)
      csvRows.push(nextRow)
      leftOverFt -= nextRow.breakdown
      leftOverWatts = (leftOverWatts - nextRow.wattage) < 0 ? (leftOverWatts - nextRow.wattage) : 90
    }
  }

  if (run.dimmingType === '0-10') {
    csvRows = update0to10Drivers(csvRows)
  }

  return csvRows
}

function calculateFirstRow (totalLength, runType, wattsPerFt, dimmingType, fixture) {
  var inches = Math.floor(totalLength * 12)
  var feet = Math.floor(inches / 12)
  var firstRow = {
    type: runType,
    length: round(totalLength),
    lengthFt: feet,
    lengthIn: inches - (feet * 12)
  }
  firstRow = doCalculations(firstRow, totalLength, wattsPerFt, fixture)
  firstRow.powerfeed = 1
  firstRow[dimmingType] = 1
  firstRow.location = fixture.fixtureLocation
  return firstRow
}

function round (num) {
  var biggerNum = Math.round(num * 100)
  return biggerNum / 100
}

function calculateNextRow (totalLength, wattsPerFt, wattsLeft, dimmingType, fixture) {
  var nextRow = {}
  nextRow = doCalculations(nextRow, totalLength, wattsPerFt, fixture)
  nextRow.powerfeed = 0
  if (wattsLeft - nextRow.wattage < 0) {
    nextRow[dimmingType] = 1
  }
  return nextRow
}

function doCalculations (rowObj, totalLength, wattsPerFt, fixture) {
  var breakdown = (totalLength - 6 > 0) ? 6 : totalLength
  rowObj.breakdown = breakdown
  rowObj.roundedBreakdown = round(breakdown)
  rowObj.wattage = round(rowObj.breakdown * wattsPerFt)
  rowObj.twoFt = Math.floor(rowObj.breakdown / 2)
  rowObj.oneFt = Math.ceil(rowObj.breakdown - (rowObj.twoFt * 2))
  // var leftOver = rowObj.breakdown - (rowObj.twoFt * 2) - rowObj.oneFt
  // rowObj.oneIn = leftOver * 12
  rowObj.cornerLeft = 0
  rowObj.cornerRight = 0
  rowObj.nonfeed = (totalLength - rowObj.breakdown === 0) ? 1 : 0
  rowObj.mountingKit = 1
  rowObj.wattsPerFt = fixture.intensity * 1
  rowObj.partNum = fixture.partNumber
  rowObj.cct = cutCCT(fixture.cct)
  if (fixture.powderCoating !== 'None') {
    rowObj.powderCoating = (rowObj.twoFt * 2) + rowObj.oneFt
  }
  if (fixture.lens === 'G - Glazer Optics') {
    rowObj.optics = (rowObj.twoFt * 2) + rowObj.oneFt
  }
  return rowObj
}

function cutCCT (cct) {
  var cctArr = cct.split('-')
  return cctArr[1].trim()
}

function update0to10Drivers (rows) {
  let driverObjs = []
  for (let i = 0; i < rows.length; i++) {
    let row = rows[i]
    if (row['0-10']) {
      driverObjs.push({idx: i, totalWattage: row.wattage})
    } else {
      driverObjs[driverObjs.length - 1]["totalWattage"] += row.wattage
    }
  }
  for (let i = 0; i < driverObjs.length; i++) {
    let driverObj = driverObjs[i]
    if (driverObj.totalWattage < 25) {
      delete rows[driverObj.idx]['0-10']
      rows[driverObj.idx].zeroToTen30 = 1
    } else if (driverObj.totalWattage < 55) {
      delete rows[driverObj.idx]['0-10']
      rows[driverObj.idx].zeroToTen60 = 1
    } else {
      delete rows[driverObj.idx]['0-10']
      rows[driverObj.idx].zeroToTen96 = 1
    }
  }
  return rows
}
