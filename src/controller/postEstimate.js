import estimator from '../estimator';

const postEstimate = (req, res) => {
  const { 
    region,
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds 
  } = req.body;

  const {
    name,
    avgAge,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation
  } = region;

  const data = {
    region: {
      name,
      avgAge,
      avgDailyIncomeInUSD,
      avgDailyIncomePopulation
    },
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  };

  const response = estimator(data);

  return res.status(201).json({
    data: response.data,
    impact: response.impact,
    severeImpact: response.severeImpact
  });
};

export default postEstimate;
