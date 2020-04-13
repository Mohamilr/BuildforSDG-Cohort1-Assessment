const path = require('path');

const getLogs = (req, res) => {
  res.type('text/plain');
  res.status(200).download(path.join(__dirname, '../logs.log'), 'requestslog.txt');
};

module.exports = getLogs;
