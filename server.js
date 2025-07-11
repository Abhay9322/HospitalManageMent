import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import cors from 'cors';

//configure env
dotenv.config();

//database config
connectDB();

const app = express();

// ✅ FIXED: CORS Setup
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

//middleware
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use('/api/v1/auth', authRoute);

//rest api
app.get('/', (req, res) => {
    res.send({
        message: "Welcome to ecommerce app"
    });
});

//port
const PORT = process.env.PORT || 8000;

//run listen
app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});
