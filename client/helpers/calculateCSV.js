export default function calculateCSV (run) {
  console.log('******', run)
  var csvRows = []
  for (let i = 0; i < run.quantity; i++) {
    var totalLength = run.lengthFt
    var firstRow = calculateFirstRow(totalLength, run.type, run.wattsPerFt, run.dimmingType)
    csvRows.push(firstRow)
    var leftOverFt = totalLength - firstRow.breakdown
    var leftOverWatts = 90 - firstRow.wattage
    while (leftOverFt) {
      var nextRow = calculateNextRow(leftOverFt, run.wattsPerFt, leftOverWatts, run.dimmingType)
      csvRows.push(nextRow)
      leftOverFt -= nextRow.breakdown
      leftOverWatts = (leftOverWatts - nextRow.wattage) < 0 ? (leftOverWatts - nextRow.wattage) : 90
    }
  }
  return csvRows
}

function calculateFirstRow (totalLength, runType, wattsPerFt, dimmingType) {
  var firstRow = {
    type: runType,
    length: totalLength
  }
  firstRow = doCalculations(firstRow, totalLength, wattsPerFt)
  firstRow.powerfeed = 1
  firstRow[dimmingType] = 1
  return firstRow
}

function calculateNextRow (totalLength, wattsPerFt, wattsLeft, dimmingType) {
  var nextRow = {}
  nextRow = doCalculations(nextRow, totalLength, wattsPerFt)
  nextRow.powerfeed = 0
  if (wattsLeft - nextRow.wattage < 0) {
    nextRow[dimmingType] = 1
  }
  return nextRow
}

function doCalculations (rowObj, totalLength, wattsPerFt) {
  var breakdown = (totalLength - 6 > 0) ? 6 : totalLength
  rowObj.breakdown = breakdown
  rowObj.wattage = rowObj.breakdown * wattsPerFt
  rowObj.twoFt = Math.floor(rowObj.breakdown / 2)
  rowObj.oneFt = Math.floor(rowObj.breakdown - (rowObj.twoFt * 2))
  var leftOver = rowObj.breakdown - (rowObj.twoFt * 2) - rowObj.oneFt
  rowObj.oneIn = leftOver * 12
  rowObj.cornerLeft = 0
  rowObj.cornerRight = 0
  rowObj.nonfeed = (totalLength - rowObj.breakdown === 0) ? 1 : 0
  rowObj.mountingKit = 1
  return rowObj
}
