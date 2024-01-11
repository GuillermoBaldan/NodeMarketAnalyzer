const yahooStockPrices = require('yahoo-stock-prices-fetch');

async function getStockPrice(symbol, date) {
    try {
        const data = await yahooStockPrices.getHistoricalPrices(
            date.getMonth(),
            date.getDate() - 1, // La API utiliza un índice base 0 para los días
            date.getFullYear(),
            symbol,
            '1d' // Intervalo de 1 día
        );
        if (data.length > 0) {
            console.log(`El precio de cierre de ${symbol} en ${date.toISOString().split('T')[0]} fue ${data[0].close}`);
        } else {
            console.log(`No se encontraron datos para ${symbol} en ${date.toISOString().split('T')[0]}`);
        }
    } catch (error) {
        console.error(`Error al obtener los precios de las acciones: ${error}`);
    }
}

// Ejemplo de uso
getStockPrice('AAPL', new Date('2024-01-09'));