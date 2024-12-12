const express = require('express');
const { createSchedule,getUserSchedule, addCourse } = require('../controllers/scheduleController');
const router = express.Router();


router.post('/', createSchedule);
router.get('/:userId', getUserSchedule);
router.post('/', addCourse);

module.exports = router;
