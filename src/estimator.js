const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};

  // data
  const {
    region,
    periodType,
    timeToElapse,
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
    days = timeToElapse * 7;
  }
  if (/months/i.test(periodType)) {
    days = timeToElapse * 30;
  }
  if (/days/i.test(periodType)) {
    days = timeToElapse;
  }

  const requestedTime = Math.trunc(days / 3);

  impact.currentlyInfected = reportedCases * 10;
  //
  severeImpact.currentlyInfected = reportedCases * 50;
  // challenge 1
  impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** requestedTime);
  //
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** requestedTime);
  // new task
  impact.severeCasesByRequestedTime = (15 / 100) * impact.infectionsByRequestedTime;
  //
  severeImpact.severeCasesByRequestedTime = (15 / 100) * severeImpact.infectionsByRequestedTime;
  // challenge 2
  const impactbedValue = (35 / 100) * totalHospitalBeds - impact.severeCasesByRequestedTime;
  impact.hospitalBedsByRequestedTime = Math.trunc(impactbedValue);
  //
  const severeImpactbedValue = (35 / 100) * totalHospitalBeds - severeImpact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(severeImpactbedValue);
  // challenge 3
  const impactICU = (5 / 100) * impact.infectionsByRequestedTime;
  impact.casesForICUByRequestedTime = Math.trunc(impactICU);
  //
  const severeImpactICU = (5 / 100) * severeImpact.infectionsByRequestedTime;
  severeImpact.casesForICUByRequestedTime = Math.trunc(severeImpactICU);
  // new task
  const impactVentilators = (2 / 100) * impact.infectionsByRequestedTime;
  impact.casesForVentilatorsByRequestedTime = Math.trunc(impactVentilators);
  //
  const severeImpactVentilators = (2 / 100) * severeImpact.infectionsByRequestedTime;
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(severeImpactVentilators);
  // new task
  const impactDollars = (impact.infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD) / days;
  impact.dollarsInFlight = Math.trunc(impactDollars);
  //
  const severeImpactDollars = (severeImpact.infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD) / days;
  severeImpact.dollarsInFlight = Math.trunc(severeImpactDollars);

  return {
    data,
    impact,
    severeImpact
  };
};

module.exports = covid19ImpactEstimator;
