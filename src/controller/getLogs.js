const path = require('path');

const getLogs = (req, res) => {
  res.headers['content-type'] = 'text/plain';
  res.download(path.join(__dirname, '../logs.log'), 'requestslog.txt');
};

module.exports = getLogs;
