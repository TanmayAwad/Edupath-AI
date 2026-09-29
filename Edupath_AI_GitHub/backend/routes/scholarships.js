const express = require('express');
const router = express.Router();
const { getAllScholarships } = require('../controllers/scholarshipController');

router.get('/', getAllScholarships);

module.exports = router;
