const fs = require('fs');
const path = require('path');

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
  const days = jsonData.length;
  
  let consecutiveDays = 0;
  let maxConsecutiveDays = 0;
  let startDate = '';
  let endDate = '';

  for (let i = 0; i < days; i++) {
    if (jsonData[i].close < jsonData[i].open) {
      if (consecutiveDays === 0) {
        startDate = jsonData[i].dateTime;
      }
      consecutiveDays++;
      if (consecutiveDays > maxConsecutiveDays) {
        maxConsecutiveDays = consecutiveDays;
        endDate = jsonData[i].dateTime;
      }
    } else {
      consecutiveDays = 0;
    }
  }

  console.log(`The greatest number of consecutive days with closing below opening for ${ticket} is: ${maxConsecutiveDays}`);
  console.log(`Date range: From ${startDate} to ${endDate}`);
});
