const yahooStockPrices = require('yahoo-stock-prices');
const fs = require('fs');

const symbols = ['KO']; // Agrega más símbolos según sea necesario
const specificDate = '2024-01-9';

async function obtenerDatosDelDia() {
  try {
    const data = await Promise.all(
        symbols.map(async (symbol) => {
          try {
            return await yahooStockPrices.getHistoricalPrices(symbol, specificDate, specificDate);
          } catch (error) {
            console.error(`Error al obtener datos para ${symbol}:`, error);
            return null;
          }
        })
      );

    const csvContent = data.map((stockData, index) => {
      const symbol = symbols[index];

      if (stockData) {
        return `${symbol},${stockData.open},${stockData.close}\n`;
      } else {
        return `${symbol},No Data\n`;
      }
    }).join('');

    fs.writeFileSync('KO_datos_9_enero_2024.csv', `Symbol,Open,Close\n${csvContent}`);
    
    console.log('Datos del 9 de enero de 2024 guardados en KO_datos_9_enero_2024.csv');
  } catch (error) {
    console.error('Error al obtener y guardar los datos:', error);
  }
}

obtenerDatosDelDia();
