//!!!to run server run node server.js from the backend directory
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';

// Import and configure dotenv at the top before accessing environment variables
dotenv.config({ path: '../../.env' });

// Define port number
const app = express();
const port = process.env.PORT || 5000;

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

// Start the server and connect to MongoDB
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(process.env.MONGO_DB_URI); // Log the MongoDB URI
    connectToMongoDB();
});