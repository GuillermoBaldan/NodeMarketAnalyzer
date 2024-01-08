const axios = require('axios');
const fs = require('fs');

// Obtener el ticket de la acción desde el terminal
const ticket = process.argv[2]; // El primer argumento después de 'node' y 'nombre_del_script.js'

if (!ticket) {
  console.error('Por favor, proporciona el ticket del valor (ejemplo: node nombre_del_script.js AAPL)');
  process.exit(1);
}

const options = {
  method: 'GET',
  url: 'https://yahoo-finance-historical-stock-prices1.p.rapidapi.com/GetHistoricalPrices',
  params: { symbol: ticket },
  headers: {
    'X-RapidAPI-Key': 'e2b40e9641mshb911dd1b182aae5p1ffaa9jsn8708248161f7',
    'X-RapidAPI-Host': 'yahoo-finance-historical-stock-prices1.p.rapidapi.com',
  },
};

(async () => {
  try {
    const response = await axios.request(options);
    const data = response.data;

    // Guardar los datos en un archivo JSON
    const filename = `${ticket}_stock_data.json`;
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    console.log(`Datos guardados en ${filename}`);
  } catch (error) {
    console.error(error);
  }
})();
