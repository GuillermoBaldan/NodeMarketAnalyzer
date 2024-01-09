const { machine } = require("os");

function frequencyOfConsecutiveDecreaseSeries(jsonData) {
    let consecutiveDays = 0;
    const frequencyMap = new Map();

    for (let i = 0; i < jsonData.length; i++) {
        if (jsonData[i].close < jsonData[i].open) {
            consecutiveDays++;
        } else {
            if (consecutiveDays > 1) {
                if (!frequencyMap.has(consecutiveDays)) {
                    frequencyMap.set(consecutiveDays, 1);
                } else {
                    frequencyMap.set(consecutiveDays, frequencyMap.get(consecutiveDays) + 1);
                }
            }
            consecutiveDays = 0;
        }
    }

    // Convertimos el mapa a un array de objetos
    const frequencyArray = [];
    frequencyMap.forEach((value, key) => {
        const probability = value / jsonData.length;
        const probabilityIncreaseNextDay = 1 - probability;
        frequencyArray.push({ consecutiveDays: key, frequency: value, probability, probabilityIncreaseNextDay });
    });
    frequencyArray.sort((a, b) => a.consecutiveDays - b.consecutiveDays);
    
    return frequencyArray;
}


function findLargestConsecutiveDecrease(jsonData) {
    let consecutiveDays = 0;
    let maxConsecutiveDays = 0;
    let startDate = jsonData[0].dateTime; // Establecemos la primera fecha como inicio por defecto
    let endDate = '';
    let startConsecutiveDate = '';
    let maxConsecutiveDates = []; // Array para almacenar fechas de caídas consecutivas máximas
    let consecutiveDates = [];
 // Completar el código
    return { maxConsecutiveDays, startDate, endDate, maxConsecutiveDates };
}


 function calculateLossPercentage(date, jsonData) {
        let totalLossPercentage = 0;
        let countDays = 0;
    
        for (let i = 0; i < jsonData.length; i++) {
        if (jsonData[i].dateTime === date && jsonData[i].close < jsonData[i].open) {
            const lossPercentage = ((jsonData[i].open - jsonData[i].close) / jsonData[i].open) * 100;
            totalLossPercentage += lossPercentage;
            countDays++;
        }
        }
    
        if (countDays === 0) {
        console.log(`No data found for the date ${date} or no days with closing below opening.`);
        return 0;
        }
    
        return totalLossPercentage / countDays;
    }
    

  module.exports = {
    frequencyOfConsecutiveDecreaseSeries,
    findLargestConsecutiveDecrease,
    calculateLossPercentage
  };