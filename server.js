import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';

//configure env
dotenv.config();

const app = express();

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