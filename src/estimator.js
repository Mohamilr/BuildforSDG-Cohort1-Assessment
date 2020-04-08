const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};

  // data
  const { 
    region,
    periodType,
    reportedCases,
    totalHospitalBeds 
  } = data;

  const {
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation
  } = region;

  // compute days
  let days;
  if (/weeks/i.test(periodType)) {
    const value = periodType.split(' ');
    days = parseInt(value[0], 10) * 7;
  }
  if (/months/i.test(periodType)) {
    const value = periodType.split(' ');
    days = parseInt(value[0], 10) * 30;
  }
  if (/days/i.test(periodType)) {
    const value = periodType.split(' ');
    days = parseInt(value[0], 10);
  }

  const requestedTime = Math.floor(days / 3);

  impact.currentlyInfected = reportedCases * 10;
  //
  severeImpact.currentlyInfected = reportedCases * 50;
  // new task
  impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** requestedTime);
  //
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** requestedTime);
  // new task
  impact.severeCasesByRequestedTime = (15 / 100) * impact.infectionsByRequestedTime;
  //
  severeImpact.severeCasesByRequestedTime = (15 / 100) * severeImpact.infectionsByRequestedTime;
  // new task
  impact.hospitalBedsByRequestedTime = (35 / 100) * totalHospitalBeds - impact.severeCasesByRequestedTime;
  //
  severeImpact.hospitalBedsByRequestedTime = (35 / 100) * totalHospitalBeds - severeImpact.severeCasesByRequestedTime;
  // new task
  impact.casesForICUByRequestedTime = (5 / 100) * impact.infectionsByRequestedTime;
  //
  severeImpact.casesForICUByRequestedTime = (5 / 100) * severeImpact.infectionsByRequestedTime;
  // new task
  impact.casesForVentilatorsByRequestedTime = (2 / 100) * impact.infectionsByRequestedTime;
  //
  severeImpact.casesForVentilatorsByRequestedTime = (2 / 100) * severeImpact.infectionsByRequestedTime;
  // new task
  impact.dollarsInFlight = impact.infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD * 30;
  //
  severeImpact.dollarsInFlight = severeImpact.infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD * 30;

  return {
    data,
    impact,
    severeImpact
  };
};

module.exports = covid19ImpactEstimator;
