function convertirTimestamp(timestamp) {
    const fecha = new Date(timestamp * 1000);
    const fechaLegible = `${fecha.getFullYear()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${('0' + fecha.getDate()).slice(-2)} ${('0' + fecha.getHours()).slice(-2)}:${('0' + fecha.getMinutes()).slice(-2)}:${('0' + fecha.getSeconds()).slice(-2)}`;
    return fechaLegible;
  }
  
  function convertirTimestampsEnObjeto(objeto) {
    for (let key in objeto) {
      if (typeof objeto[key] === 'number') {
        const lowerCaseKey = key.toLowerCase();
        if (lowerCaseKey.includes('timestamp') || lowerCaseKey.includes('date')) {
          objeto[key] = convertirTimestamp(objeto[key]);
                 }
      } else if (typeof objeto[key] === 'object') {
        convertirTimestampsEnObjeto(objeto[key]);
      }
    }
  }
  
  // Ejemplo de uso:
  const objetoEjemplo = {
    dato1: 1704790800,
    dato2: {
      subdato1: 1704790800,
      subdato2: {
        subsubdato: 1704790800
      }
    },
    dato3: 'no es un timestamp'
  };
  
  convertirTimestampsEnObjeto(objetoEjemplo);
  console.log(objetoEjemplo); // Muestra el objeto con los timestamps convertidos a fechas legibles
 
  