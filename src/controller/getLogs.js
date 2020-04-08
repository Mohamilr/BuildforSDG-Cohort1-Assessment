import path from 'path';

const getLogs = (req, res) => {
  res.download(path.join(__dirname, '../logs.log'), 'requestslog.txt');
};

export default getLogs;
