const xml = require('xml2js');
const estimator = require('../estimator');

const builder = new xml.Builder();

class postEstimate {
  static postJson(req, res) {
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

    const estimate = estimator(data);

    res.type('application/json');
    return res.status(201).json({
      data: estimate.data,
      impact: estimate.impact,
      severeImpact: estimate.severeImpact
    });
  }

  static postXml(req, res) {
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

    const estimate = estimator(data);

    res.type('application/xml');
    return res.status(201).send(builder.buildObject({ estimate }));
  }
};

module.exports = postEstimate;
