const axios = require('axios');

async function obtenerPrecioCierre(symbols) {
    const results = [];
    for (const symbol of symbols) {
        try {
            const response = await axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=2d`);
            const data = response.data;
            if (data.chart.result) {
                const result = data.chart.result[0];
                const timestamp = result.timestamp;
                const closePrices = result.indicators.quote[0].close;
                const previousClosePrice = closePrices[closePrices.length - 2];
                const date = new Date(timestamp[timestamp.length - 2] * 1000).toISOString().split('T')[0];
                results.push({
                    fecha: date,
                    simbolo: symbol,
                    precioCierre: previousClosePrice
                });
            } else {
                console.log(`No se pudo obtener el precio de cierre para ${symbol}`);
            }
        } catch (error) {
            console.error(`Error al obtener el precio de cierre para ${symbol}: ${error}`);
        }
    }
    return results;
}

obtenerPrecioCierre(['AAPL', 'GOOG', 'MSFT'])  // reemplaza ['AAPL', 'GOOG', 'MSFT'] con los símbolos de las acciones que deseas consultar
.then(results => console.log(results));
