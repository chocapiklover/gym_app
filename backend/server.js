//!to run server run node server.js from the backend directory
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

//file imports 
import authRoutes from './routes/auth.js'
import newWorkoutRoutes from './routes/new_workout.js';
// Import and configure dotenv at the top before accessing environment variables
dotenv.config({ path: '../.env' });

// Define port number
const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors()); // Use CORS middleware to allow requests from the frontend
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes);
app.use(newWorkoutRoutes);

// Define a route for HTTP GET requests to the root URL '/'
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Connect to MongoDB
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

// verify that the backend is connected
app.listen(port, () => {
    console.log(`Server running on here http://localhost:${port}`);
    console.log(process.env.MONGO_DB_URI); // Log the MongoDB URI
    connectToMongoDB();
});