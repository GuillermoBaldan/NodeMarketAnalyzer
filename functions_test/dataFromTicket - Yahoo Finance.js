const fs = require('fs'); // Importar el módulo 'fs' para trabajar con archivos
const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://yahoo-finance127.p.rapidapi.com/historic/aapl/1d/max',
  headers: {
    'X-RapidAPI-Key': 'e2b40e9641mshb911dd1b182aae5p1ffaa9jsn8708248161f7',
    'X-RapidAPI-Host': 'yahoo-finance127.p.rapidapi.com'
  }
};

(async () => {
  try {
    const response = await axios.request(options);
    const jsonData = response.data;

    // Escribir los datos en un archivo JSON
    fs.writeFileSync('datos.json', JSON.stringify(jsonData, null, 2));
    console.log('Los datos se han guardado correctamente en datos.json');
  } catch (error) {
    console.error(error);
  }
})();
