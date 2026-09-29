const express = require('express');
const router = express.Router();
const { getAllPathways, getPathwayById } = require('../controllers/pathwayController');

router.get('/', getAllPathways);
router.get('/:id', getPathwayById);

module.exports = router;
