const express = require('express');
const router = express.Router();
const { runSimulation } = require('../controllers/simulatorController');

router.post('/simulate', runSimulation);

module.exports = router;
