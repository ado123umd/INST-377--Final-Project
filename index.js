const express = require('express');
const cors = require('cors');
const app = express();
const port = 5001;
const courseRoutes = require('./src/routes/courseRoutes');
const majorsRoutes = require('./src/routes/majorRoutes');
const scheduleRoutes = require('./src/routes/scheduleRoutes');

// Middleware
app.use(cors());
app.use(express.json()); 
app.get('/', (req, res) => {
    res.sendFile('public/home.html', { root: 'public' });
});

//register cours routes
app.use('/api/courses', courseRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/majors', majorsRoutes);	
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
