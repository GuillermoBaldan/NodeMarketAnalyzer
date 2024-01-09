function isTimestamp(value) {
    const referenceDate = new Date('1602-01-01').getTime(); // Fecha de referencia en milisegundos
  
    // Verifica si es un número entero y si es mayor o igual a la fecha de referencia
    return Number.isInteger(value) && value >= referenceDate;
  }
  
  // Ejemplo de uso:
  const timestamp1 = 1641726000000; // Timestamp en milisegundos
  const timestamp2 = '2023-01-09T08:00:00.000Z'; // Una cadena de tiempo en formato ISO
  
  console.log(isTimestamp(timestamp1)); // Devolverá true
  console.log(isTimestamp(timestamp2)); // Devolverá false
  