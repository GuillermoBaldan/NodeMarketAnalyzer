function findLargestConsecutiveDecrease(jsonData) {
    let consecutiveDays = 0;
    let maxConsecutiveDays = 0;
    let startDate = '';
    let endDate = '';
    let startConsecutiveDate = '';
  
    for (let i = 0; i < jsonData.length; i++) {
      if (jsonData[i].close < jsonData[i].open) {
        if (consecutiveDays === 0) {
          startConsecutiveDate = jsonData[i].dateTime;
        }
        consecutiveDays++;
        if (consecutiveDays > maxConsecutiveDays) {
          maxConsecutiveDays = consecutiveDays;
          startDate = startConsecutiveDate;
          endDate = jsonData[i].dateTime;
        }
      } else {
        consecutiveDays = 0;
      }
    }
  
    return { maxConsecutiveDays, startDate, endDate };
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
    findLargestConsecutiveDecrease,
    calculateLossPercentage
  };