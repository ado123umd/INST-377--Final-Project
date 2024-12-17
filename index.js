const express = require('express');
const cors = require('cors');
const path = require('path'); // Missing 'path' import
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve the home page
app.get('/', (req, res) => {
    res.sendFile('home.html', { root: path.join(__dirname, 'public') });
});

app.get('/', (req, res) => {
    res.sendFile('Function_Page.html', { root: path.join(__dirname, 'public') });
});

// Routes
const courseRoutes = require('./src/routes/courseRoutes');
const majorsRoutes = require('./src/routes/majorRoutes');
const scheduleRoutes = require('./src/routes/scheduleRoutes');

app.use('/api/courses', courseRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/majors', majorsRoutes);

// Export the app for Vercel
module.exports = app;
