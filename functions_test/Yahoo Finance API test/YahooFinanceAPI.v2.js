const axios = require('axios');

async function obtenerPrecioCierre(symbol) {
    try {
        const response = await axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=2d`);
        const data = response.data;
        if (data.chart.result) {
            const result = data.chart.result[0];
            const timestamp = result.timestamp;
            const closePrices = result.indicators.quote[0].close;
            const previousClosePrice = closePrices[closePrices.length - 2];
            console.log(`El precio de cierre del día anterior para ${symbol} fue ${previousClosePrice}`);
        } else {
            console.log('No se pudo obtener el precio de cierre');
        }
    } catch (error) {
        console.error(`Error al obtener el precio de cierre: ${error}`);
    }
}

obtenerPrecioCierre('AAPL');  // reemplaza 'AAPL' con el símbolo de la acción que deseas consultar
