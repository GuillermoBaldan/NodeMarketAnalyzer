const readline = require('readline');

// Función para convertir un timestamp a una fecha legible
function convertirTimestamp(timestamp) {
  const fecha = new Date(timestamp * 1000); // Convertir timestamp a fecha
  const fechaLegible = `${fecha.getFullYear()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${('0' + fecha.getDate()).slice(-2)} ${('0' + fecha.getHours()).slice(-2)}:${('0' + fecha.getMinutes()).slice(-2)}:${('0' + fecha.getSeconds()).slice(-2)}`; // Formatear fecha legible
  return fechaLegible;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Ingresa el timestamp: ', (timestamp) => {
  const fechaLegible = convertirTimestamp(timestamp);
  console.log(`La fecha correspondiente al timestamp ${timestamp} es: ${fechaLegible}`);
  
  rl.close();
});
