const express = require('express');
const router = express.Router();
const { calculateMatrix } = require('../controllers/matrixController');

router.post('/calculate', calculateMatrix);

module.exports = router;
