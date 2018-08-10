export default function calculateCSV (run) {
  var csvRows = []
  for (let i = 0; i < run.quantity; i++) {
    var totalLength = run.lengthFt
    var firstRow = calculateFirstRow(totalLength, run.type, run.wattsPerFt)
    csvRows.push(firstRow)
    var leftOverFt = totalLength - firstRow.breakdown
    var leftOverWatts = 100 - firstRow.wattage
    while (leftOverFt) {
      var nextRow = calculateNextRow(leftOverFt, run.wattsPerFt, leftOverWatts)
      csvRows.push(nextRow)
      leftOverFt -= nextRow.breakdown
      leftOverWatts = (leftOverWatts - nextRow.wattage) < 0 ? (leftOverWatts - nextRow.wattage) : 100
    }
  }
  return csvRows
}

function calculateFirstRow (totalLength, runType, wattsPerFt) {
  var firstRow = {
    type: runType,
    length: totalLength
  }
  firstRow = doCalculations(firstRow, totalLength, wattsPerFt)
  firstRow.powerfeed = 1
  firstRow.driver = 1
  return firstRow
}

function calculateNextRow (totalLength, wattsPerFt, wattsLeft) {
  var nextRow = {}
  nextRow = doCalculations(nextRow, totalLength, wattsPerFt)
  nextRow.powerfeed = 0
  if (wattsLeft - nextRow.wattage < 0) {
    nextRow.driver = 1
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
