const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

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
      });
    done();
  });

  it('should post data for estimate in json', (done) => {
    chai.request(app)
      .post('/api/v1/on-covid-19/json')
      .send(data)
      .end((err, res) => {
        res.should.be.a('object');
        res.should.have.status(201);
        res.body.should.have.property('data');
        res.body.should.have.property('impact');
        res.body.should.have.property('severeImpact');
      });
    done();
  });

  it('should post data for estimate in xml', (done) => {
    chai.request(app)
      .post('/api/v1/on-covid-19/xml')
      .send(data)
      .end((err, res) => {
        res.should.be.a('object');
        res.should.have.status(201);
        res.header.should.have.property('content-type');
        res.header['content-type'].should.equal('application/xml; charset=utf-8');
      });
    done();
  });

  // test middlewares
  it('should give error if body values are not supplied in json', (done) => {
    chai.request(app)
      .post('/api/v1/on-covid-19/json')
      .send({
        region: {
          name: '',
          avgAge: 19.7,
          avgDailyIncomeInUSD: 5,
          avgDailyIncomePopulation: 0.71
        },
        periodType: '',
        timeToElapse: 58,
        reportedCases: 674,
        population: 66622705,
        totalHospitalBeds: 1380614
      })
      .end((err, res) => {
        res.should.be.a('object');
        res.should.have.status(400);
        res.body.should.have.property('status');
        res.body.should.have.property('message');
      });
    done();
  });

  it('should give error if body values are not supplied in xml', (done) => {
    chai.request(app)
      .post('/api/v1/on-covid-19/xml')
      .send({
        region: {
          name: '',
          avgAge: 19.7,
          avgDailyIncomeInUSD: 5,
          avgDailyIncomePopulation: 0.71
        },
        periodType: '',
        timeToElapse: 58,
        reportedCases: 674,
        population: 66622705,
        totalHospitalBeds: 1380614
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.header['content-type'].should.equal('application/xml; charset=utf-8');
      });
    done();
  });

  // get logs
  it('should give error if body values are not supplied in json', (done) => {
    chai.request(app)
      .get('/api/v1/on-covid-19/logs')
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });

  // app.js
  it('should visit welcome route', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.be.a('object');
        res.should.have.status(200);
        res.body.should.have.property('message');
      });
    done();
  });
});
