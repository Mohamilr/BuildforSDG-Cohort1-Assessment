import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';

// import routes
import postEstimate from './route/postEstimate.route';
import getLogs from './route/getLogs.route';

dotenv.config();

const app = express();

// configure body parser
app.use(bodyParser.json());
// morgan
app.use(morgan('dev'));

// log all requests to access.log
app.use(morgan('tiny', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
  }))

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

app.listen(port, () => {
    console.log(`app is running on port ${port}`)
});

export default app;