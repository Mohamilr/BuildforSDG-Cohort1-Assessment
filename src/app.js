import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();

const app = express();

// configure body parser
app.use(bodyParser.json());
// morgan
app.use(morgan('dev', () => {
    console.log(method);
}))
const port = process.env.PORT || 8000;

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