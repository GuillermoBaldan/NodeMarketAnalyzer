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
      if (propiedadesAConvertir.includes(propiedad) && isTimestamp(objeto[propiedad])) {
        nuevoObjeto[propiedad] = timeStampConvert(objeto[propiedad]);
      } else {
        nuevoObjeto[propiedad] = objeto[propiedad];
      }
    }
    return nuevoObjeto;
  }
  
  let exampleObject = {
    timestamp1: 2342,
    timestamp2: "hola",
    timestamp3: 345479400
  };
  
  let propiedadesConvertir = ['timestamp3']; // Propiedades a convertir
  
  let nuevoObjeto = convertirTimestamps(exampleObject, propiedadesConvertir);
  console.log(nuevoObjeto);
  