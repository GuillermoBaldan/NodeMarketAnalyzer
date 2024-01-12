const yahooStockPrices = require('yahoo-stock-prices-fetch');

// Uso de la función getCurrentPrice
yahooStockPrices.getCurrentPrice('AAPL', function(err, price){
    console.log(price); // Imprime el precio actual de las acciones de Apple
});