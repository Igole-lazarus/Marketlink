require('dotenv').config();
const express = require('express'); // Fixed: changed 'required' to 'require'
const mongoose = require('mongoose');
const cors = require('cors');

//import your staff routes here once created
//const staffRoutes = require('./routes/staffRoutes');
const authRoutes = require('./routes/authRoutes');// ADDED:import the auth routes

const app = express();

//---- middleware ----
app.use(cors());// allows frontend react app to make requests to this API
app.use(express.json());// parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }));// parses incoming requests with URL-encoded payloads

//---- Database connection ----//
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`[Database] MongoDB connected successfully on host: ${conn.connection.host}`);
    } catch (error) {
        console.error(`[Database] connection error: ${error.message}`);
        //Exit the Node process if the database connection fails
        process.exit(1);
    }
};

//Initialize connection
connectDB();

//---- API routes ----
//---mount your staff routes to specify endpoint path
//app.use('/api/staff', staffRoutes);

// ADDED: mount the auth routes to hundle login and register path
app.use('/api/auth', authRoutes);

//Basic health check route to verify that server is up
app.get('/', (req, res) => {
    res.status(200).json({ message: 'marketlink system API is running' });
});

//catch-all route for undefined endpoints
app.use(/(.*)/, (req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

// Global error handler (catches error thron in a routes)
app.use((err, req, res, next) => { // Standardized nextr to next
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

//start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`[server] server is running on port ${PORT}`); // Fixed: switched single quotes to backticks for string interpolation
});