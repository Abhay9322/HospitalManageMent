import express, { json } from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';

//configure env
dotenv.config();

//database config
connectDB();

const app = express();

//middelware
app.use(morgan('dev'));

//middelware
app.use(express.json());

//rest api
app.get('/', (req, res) => {
    res.send({
        message: "Welcome to ecommerce app"
    })
});

//port
const PORT = process.env.PORT || 8000;

//run listen
app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);

});