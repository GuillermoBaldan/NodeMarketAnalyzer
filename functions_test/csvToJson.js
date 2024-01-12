const fs = require('fs');
const csv = require('csv-parser');

const results = [];

fs.createReadStream('./data_test/SP500.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    const jsonData = JSON.stringify(results, null, 2);
    fs.writeFile('SP500.json', jsonData, (err) => {
      if (err) {
        console.error('Error writing JSON file:', err);
      } else {
        console.log('Conversion from CSV to JSON completed.');
      }
    });
  });
