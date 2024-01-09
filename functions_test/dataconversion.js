const fs = require('fs');

function convertirTimestamp(timestamp) {
  const fecha = new Date(timestamp * 1000);
  const fechaLegible = `${fecha.getFullYear()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${('0' + fecha.getDate()).slice(-2)} ${('0' + fecha.getHours()).slice(-2)}:${('0' + fecha.getMinutes()).slice(-2)}:${('0' + fecha.getSeconds()).slice(-2)}`;
  return fechaLegible;
}

function convertirTimestamps(datos) {
  for (let key in datos) {
    if (typeof datos[key] === 'number' && key.toLowerCase().includes('timestamp')) {
      datos[key] = convertirTimestamp(datos[key]);
    } else if (typeof datos[key] === 'object') {
      convertirTimestamps(datos[key]);
    }
  }
}

fs.readFile('datos.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo:', err);
    return;
  }

  try {
    let jsonData = JSON.parse(data);
    convertirTimestamps(jsonData);
    fs.writeFileSync('data_dates.json', JSON.stringify(jsonData, null, 2));
    console.log('Los datos con fechas actualizadas se han guardado en data_dates.json');
  } catch (error) {
    console.error('Error al parsear el JSON:', error);
  }
});
