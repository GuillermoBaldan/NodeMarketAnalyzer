const { exec } = require('child_process');
const axios = require('axios');
const dns = require('dns');

// Función para verificar la conexión a Internet
async function checkInternetConnection() {
  return new Promise((resolve) => {
    dns.lookup('www.google.com', (err) => {
      if (err && err.code === 'ENOTFOUND') {
        resolve(false); // No hay conexión a Internet
      } else {
        resolve(true); // Hay conexión a Internet
      }
    });
  });
}

async function waitForInternetConnection() {
  let isConnected = await checkInternetConnection();
  while (!isConnected) {
    console.log('No hay conexión a Internet. Esperando...');
    await new Promise(resolve => setTimeout(resolve, 5000)); // Esperar 5 segundos antes de volver a verificar
    isConnected = await checkInternetConnection();
  }
}

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

// Verificar conexión a Internet antes de ejecutar daily_stock_data_fetcher.js
waitForInternetConnection()
  .then(() => ejecutarDailyStockDataFetcher())
  .catch((error) => console.error(`Error al verificar la conexión a Internet: ${error}`));
