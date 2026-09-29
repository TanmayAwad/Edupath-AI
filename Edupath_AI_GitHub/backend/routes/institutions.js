const express = require('express');
const router = express.Router();
const { getAllInstitutions, compareInstitutions } = require('../controllers/institutionController');

router.get('/', getAllInstitutions);
router.post('/compare', compareInstitutions);

module.exports = router;
