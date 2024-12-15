const express = require('express');
const router = express.Router();
const {
    getCourses, 
    getCourseDetails
    } = require ('../controllers/courseController');

// fetch all courses 
router.get('/', getCourses);

//fetch  course by ID
router.get('/:id', getCourseDetails);

// //  fetch courses by a specific major
// router.get('/majors/:majorId/courses', getCoursesByMajor);

// //  sync courses from UMD API to the Supabase database
// router.post('/sync', syncCourses);

const { getPopularCourses } = require('../controllers/courseController');

// Fetch popular courses
router.get('/popular', getPopularCourses);


module.exports = router;
