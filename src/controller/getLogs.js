const path = require('path');

const getLogs = (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.download(path.join(__dirname, '../logs.log'), 'requestslog.txt');
};

module.exports = getLogs;
