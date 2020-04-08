import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('Estimate', () => {
  const data = {
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 5,
      avgDailyIncomePopulation: 0.71
    },
    periodType: '30 days',
    timeToElapse: 58,
    reportedCases: 674,
    population: 66622705,
    totalHospitalBeds: 1380614
  };

  it('should post data for estimate', (done) => {
    chai.request(app)
      .post('/api/v1/on-covid-19')
      .send(data)
      .end((err, res) => {
        res.should.be.a('object');
        res.should.have.status(201);
        res.body.should.have.property('data');
        res.body.should.have.property('impact');
        res.body.should.have.property('severeImpact');
      })
    done();
  });
});
