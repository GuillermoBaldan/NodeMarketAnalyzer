function isTimestamp(value) {
    const referenceDate = new Date('1602-01-01').getTime();
    return Number.isInteger(value) && value >= referenceDate;
  }
  
  function timeStampConvert(timestamp) {
    const fecha = new Date(timestamp * 1000);
    const fechaLegible = `${fecha.getFullYear()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${('0' + fecha.getDate()).slice(-2)} ${('0' + fecha.getHours()).slice(-2)}:${('0' + fecha.getMinutes()).slice(-2)}:${('0' + fecha.getSeconds()).slice(-2)}`;
    return fechaLegible;
  }
  
  function convertirTimestamps(objeto, propiedadesAConvertir) {
    const nuevoObjeto = {};
    for (let propiedad in objeto) {
      if (typeof objeto[propiedad] === 'object' && objeto[propiedad] !== null) {
        nuevoObjeto[propiedad] = convertirTimestamps(objeto[propiedad], propiedadesAConvertir);
      } else {
        if (propiedadesAConvertir.includes(propiedad) && isTimestamp(objeto[propiedad])) {
          nuevoObjeto[propiedad] = timeStampConvert(objeto[propiedad]);
        } else {
          nuevoObjeto[propiedad] = objeto[propiedad];
        }
      }
    }
    return nuevoObjeto;
  }
  
  let exampleObject = {
    "meta": {
      "currency": "USD",
      "symbol": "AAPL",
      "exchangeName": "NMS",
      "instrumentType": "EQUITY",
      "firstTradeDate": 345479400,
      "regularMarketTime": 1704817385,
      "gmtoffset": -18000,
      "timezone": "EST",
      "exchangeTimezoneName": "America/New_York",
      "regularMarketPrice": 184.085,
      "chartPreviousClose": 0.128,
      "priceHint": 2,
      "currentTradingPeriod": {
        "pre": {
          "timezone": "EST",
          "start": 1704790800,
          "end": 1704810600,
          "gmtoffset": -18000
        },
        "regular": {
          "timezone": "EST",
          "start": 1704810600,
          "end": 1704834000,
          "gmtoffset": -18000
        },
        "post": {
          "timezone": "EST",
          "start": 1704834000,
          "end": 1704848400,
          "gmtoffset": -18000
        }
      },
      "dataGranularity": "3mo",
      "range": "max",
      "validRanges": [
        "1d",
        "5d",
        "1mo",
        "3mo",
        "6mo",
        "1y",
        "2y",
        "5y",
        "10y",
        "ytd",
        "max"
      ]
    }
};
  
  let propiedadesConvertir = ['firstTradeDate']; // Propiedades a convertir
  
  let nuevoObjeto = convertirTimestamps(exampleObject, propiedadesConvertir);
  console.log(nuevoObjeto);
  