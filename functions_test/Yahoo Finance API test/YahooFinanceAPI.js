const YahooFinanceAPI = require('yahoo-finance-api');
const fs = require('fs');

const yahooFinance = new YahooFinanceAPI();

const symbols = ['AAPL', 'MSFT', 'GOOGL']; // Agrega más símbolos según sea necesario

// Fecha específica para obtener los datos
const specificDate = '2024-01-10';

async function obtenerDatosDelDia() {
  try {
    const data = await Promise.all(
      symbols.map(async (symbol) => {
        return await yahooFinance.historicalData(symbol, { from: specificDate, to: specificDate });
      })
    );

    const csvContent = data.map((stockData, index) => {
      const symbol = symbols[index];
      const dayData = stockData[0]; // Obtiene datos del único día

      if (dayData) {
        return `${symbol},${dayData.date},${dayData.open},${dayData.close}\n`;
      } else {
        return `${symbol},No Data\n`; // En caso de no haber datos para el día
      }
    }).join('');

    fs.writeFileSync('datos_10_enero_2024.csv', `Symbol,Date,Open,Close\n${csvContent}`);
    
    console.log('Datos del 10 de enero de 2024 guardados en datos_10_enero_2024.csv');
  } catch (error) {
    console.error('Error al obtener y guardar los datos:', error);
  }
}

obtenerDatosDelDia();
