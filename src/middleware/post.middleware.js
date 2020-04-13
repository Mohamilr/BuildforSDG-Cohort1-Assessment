const xml = require('xml2js');

const builder = new xml.Builder();
class postMiddleware {
  static jsonMiddleware(req, res, next) {
    const {
      region,
      periodType,
      timeToElapse,
      reportedCases,
      population,
      totalHospitalBeds
    } = req.body;

    const {
      avgDailyIncomeInUSD,
      avgDailyIncomePopulation
    } = region;

    if (!region || !periodType || !timeToElapse || !reportedCases || !population || !totalHospitalBeds || !avgDailyIncomeInUSD || !avgDailyIncomePopulation) {
      return res.status(400).json({
        status: 'error',
        message: 'values are required'
      });
    }

    return next();
  }

  static xmlMiddleware(req, res, next) {
    const {
      region,
      periodType,
      timeToElapse,
      reportedCases,
      population,
      totalHospitalBeds
    } = req.body;

    const {
      avgDailyIncomeInUSD,
      avgDailyIncomePopulation
    } = region;

    if (!region || !periodType || !timeToElapse || !reportedCases || !population || !totalHospitalBeds || !avgDailyIncomeInUSD || !avgDailyIncomePopulation) {
      res.type('application/xml');
      return res.status(400).send(builder.buildObject({
        status: 'error',
        message: 'values are required'
      }));
    }

    return next();
  }
}

module.exports = postMiddleware;
