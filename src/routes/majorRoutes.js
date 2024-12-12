const express = require('express');
const router = express.Router();
const { getMajors } = require('../controllers/majorsController');
router.get('/', getMajors);


module.exports = router;
