const fs = require('fs');
const path = require('path');

const ticket = process.argv[2];

if (!ticket) {
  console.error('Por favor, proporciona el ticket del valor (ejemplo: node analyzer.js AAPL)');
  process.exit(1);
}

const filename = `${ticket}_stock_data.json`;
const filePath = path.join(__dirname, 'stock_data', filename);

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error al leer el archivo ${filename}:`, err);
    process.exit(1);
  }

  const jsonData = JSON.parse(data);
  const days = jsonData.length;
  
  let consecutiveDays = 0;
  let maxConsecutiveDays = 0;

  for (let i = 0; i < days; i++) {
    if (jsonData[i].close < jsonData[i].open) {
      consecutiveDays++;
      if (consecutiveDays > maxConsecutiveDays) {
        maxConsecutiveDays = consecutiveDays;
      }
    } else {
      consecutiveDays = 0;
    }
  }

  console.log(`El mayor número de días consecutivos con cierre inferior a la apertura para ${ticket} es: ${maxConsecutiveDays}`);
});
