const fs = require('fs');
const path = require('path');
const { findLargestConsecutiveDecrease, calculateLossPercentage, frequencyOfConsecutiveDecreaseSeries } = require('./Statistical functions.js');

const ticket = process.argv[2];

if (!ticket) {
  console.error('Please provide the stock ticket (example: node analyzer.js AAPL)');
  process.exit(1);
}

const filename = `${ticket}_stock_data.json`;
const filePath = path.join(__dirname, 'stock_data', filename);

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading the file ${filename}:`, err);
    process.exit(1);
  }

  const jsonData = JSON.parse(data);

  const frequencyDecreaseSeries = frequencyOfConsecutiveDecreaseSeries(jsonData);
  const { maxConsecutiveDays, startDate, endDate, consecutiveDates } = findLargestConsecutiveDecrease(jsonData);

  console.log(frequencyDecreaseSeries);
  console.log(`The greatest number of consecutive days with closing below opening for ${ticket} is: ${maxConsecutiveDays}`);
  console.log(`Date range: From ${startDate} to ${endDate}`);
  console.log(consecutiveDates)

  const dateToCheck = startDate; // Reemplaza esta fecha con la fecha que quieras verificar
  const lossPercentage = calculateLossPercentage(dateToCheck, jsonData);
  console.log(`Loss percentage for ${dateToCheck}: ${lossPercentage.toFixed(2)}%`);
});
