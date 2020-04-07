const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};

  // 
  let days;
  if (/weeks/.test(data.periodType)) {
    let value = data.periodType.split(' ');
    days = parseInt(value[0]) * 7;
  }
  if (/months/.test(data.periodType)) {
    let value = data.periodType.split(' ');
    days = parseInt(value[0]) * 30;
  }
  if (/days/.test(data.periodType)) {
    let value = data.periodType.split(' ');
    days = parseInt(value[0]);
  }

  const requestedTime = Math.floor(days / 3);  
  
  impact.currentlyInfected = data.reportedCases * 10;
  //
  severeImpact.currentlyInfected = data.reportedCases * 50;
  ////
  impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** requestedTime);
  //
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** requestedTime);
  ////
  impact.severeCasesByRequestedTime = (15 / 100) * impact.infectionsByRequestedTime;
  //
  severeImpact.severeCasesByRequestedTime = (15 / 100) * severeImpact.infectionsByRequestedTime;
  ////
  impact.hospitalBedsByRequestedTime = (35 / 100) * data.totalHospitalBeds - impact.severeCasesByRequestedTime;
  //
  severeImpact.hospitalBedsByRequestedTime = (35 / 100) * data.totalHospitalBeds - severeImpact.severeCasesByRequestedTime;
  ////
  impact.casesForICUByRequestedTime = (5 / 100) * impact.infectionsByRequestedTime;
  //
  severeImpact.casesForICUByRequestedTime = (5 / 100) * severeImpact.infectionsByRequestedTime;
  ////
  impact.casesForVentilatorsByRequestedTime = (2 / 100) * impact.infectionsByRequestedTime;
  //
  severeImpact.casesForVentilatorsByRequestedTime = (2 / 100) * severeImpact.infectionsByRequestedTime;
  ////
  impact.dollarsInFlight = impact.infectionsByRequestedTime * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD * 30;
  //
  severeImpact.dollarsInFlight = severeImpact.infectionsByRequestedTime * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD * 30;

  return {
    data,
    impact,
    severeImpact,
  }
};

export default covid19ImpactEstimator;
