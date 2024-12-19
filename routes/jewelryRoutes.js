const express = require('express');
const { getJewelry, getJewelryByFilters } = require('../controllers/jewelryController');
const router = express.Router();

router.get('/joyas', getJewelry);
router.get('/joyas/filtros', getJewelryByFilters);

module.exports = router;
