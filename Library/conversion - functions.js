function isTimestamp(value) {
   return Number.isInteger(value) && value >= 0;
}

function timeStampConvert(timestamp) {
  const fecha = new Date(timestamp * 1000);
  const fechaLegible = `${fecha.getFullYear()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${('0' + fecha.getDate()).slice(-2)} ${('0' + fecha.getHours()).slice(-2)}:${('0' + fecha.getMinutes()).slice(-2)}:${('0' + fecha.getSeconds()).slice(-2)}`;
  return fechaLegible;
}

function convertirTimestamps(objeto, propiedadesAConvertir) {
  const nuevoObjeto = {};
  for (let propiedad in objeto) {
    if (Array.isArray(objeto[propiedad])) {
      nuevoObjeto[propiedad] = objeto[propiedad].map(elemento => {
        if (isTimestamp(elemento) && propiedadesAConvertir.includes(propiedad)) {
          return timeStampConvert(elemento);
        } else {
          return elemento;
        }
      });
    } else if (typeof objeto[propiedad] === 'object' && objeto[propiedad] !== null) {
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

  module.exports = {
    isTimestamp,
    timeStampConvert,
    convertirTimestamps
  }