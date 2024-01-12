// daily_stock_data_fetcher_reminder.js

const { exec } = require('child_process');

// Función para ejecutar el script daily_stock_data_fetcher.js
function ejecutarDailyStockDataFetcher() {
    exec('node daily_stock_data_fetcher.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar daily_stock_data_fetcher.js: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`daily_stock_data_fetcher.js generó errores: ${stderr}`);
            return;
        }
        console.log(`daily_stock_data_fetcher.js se ejecutó exitosamente:\n${stdout}`);
    });
}

// Llamada a la función para ejecutar daily_stock_data_fetcher.js
ejecutarDailyStockDataFetcher();
