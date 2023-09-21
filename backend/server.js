import express from "express";
import colors from "colors";
import dotenv from 'dotenv';
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors';


// Load environment variables from .env file
dotenv.config();



// Database configuration and connection
const mongoURI = process.env.MONGO_URL;
connectDB(mongoURI); // Assuming connectDB is a function that takes a MongoDB URI and connects to the database

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);

//PORT
const PORT = process.env.PORT || 8000;

//run listen
app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MOD} mod on port ${PORT}`.bgCyan.white);
    
});
