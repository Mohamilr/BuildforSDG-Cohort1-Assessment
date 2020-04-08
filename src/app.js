const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

// import routes
const postEstimate = require('./route/postEstimate.route');
const getLogs = require('./route/getLogs.route');

dotenv.config();

const app = express();

// configure body parser
app.use(bodyParser.json());
// morgan
app.use(morgan('dev'));

// log all requests to access.log
app.use(morgan('tiny', {
  stream: fs.createWriteStream(path.join(__dirname, 'logs.log'), { flags: 'a' })
}));

const port = process.env.PORT || 8000;

// routes
app.use('/api/v1/', postEstimate);
app.use('/api/v1/', getLogs);

// welcome route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'welcome to the api'
  });
});

// catch wrong route
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'route does not exist'
  });
});

app.listen(port);

module.exports = app;
