const axios = require('axios');
const fs = require('fs').promises;
const { rapidAPIKey_realTimeQuotes } = require('./config');

const options = {
  method: 'GET',
  url: 'https://real-time-quotes1.p.rapidapi.com/api/v1/historical/stock',
  params: {
    interval: '4hour',
    symbol: 'AAPL'
  },
  headers: {
    'X-RapidAPI-Key': realTimeQuotesAPIkey,
    'X-RapidAPI-Host': 'real-time-quotes1.p.rapidapi.com'
  }
};

async function fetchDataAndSaveToFile() {
  try {
    const response = await axios.request(options);
    await fs.writeFile('data_stock_Real-time-quotes.json', JSON.stringify(response.data, null, 2));
    console.log('Data has been saved to data_stock_Real-time-quotes.json');
  } catch (error) {
    console.error(error);
  }
}

fetchDataAndSaveToFile();
