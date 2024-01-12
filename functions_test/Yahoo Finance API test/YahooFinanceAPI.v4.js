const axios = require('axios');

async function obtenerPrecioAperturaYCierre(symbols) {
    const results = [];
    for (const symbol of symbols) {
        try {
            const response = await axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=2d`);
            const data = response.data;
            if (data.chart.result) {
                const result = data.chart.result[0];
                const timestamp = result.timestamp;
                const closePrices = result.indicators.quote[0].close;
                const openPrices = result.indicators.quote[0].open;

                // Obtener el precio de cierre y apertura del día anterior
                const previousClosePrice = closePrices[closePrices.length - 2];
                const previousOpenPrice = openPrices[openPrices.length - 2];

                const date = new Date(timestamp[timestamp.length - 2] * 1000).toISOString().split('T')[0];
                results.push({
                    fecha: date,
                    simbolo: symbol,
                    precioApertura: previousOpenPrice,
                    precioCierre: previousClosePrice
                });
            } else {
                console.log(`No se pudo obtener los precios de apertura y cierre para ${symbol}`);
            }
        } catch (error) {
            console.error(`Error al obtener los precios de apertura y cierre para ${symbol}: ${error}`);
        }
    }
    return results;
}

obtenerPrecioAperturaYCierre(['AAPL', 'GOOG', 'MSFT'])
    .then(results => console.log(results));
