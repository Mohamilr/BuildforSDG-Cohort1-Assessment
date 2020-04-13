const path = require('path');
const fs = require('fs');

const getLogs = async (req, res) => {
  const log = fs.readFileSync(path.join(__dirname, '../logs.log'));
  res.type('text/plain');
  res.status(200).send(log);
};

module.exports = getLogs;
