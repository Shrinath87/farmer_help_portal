const express = require('express');
const router = express.Router();
const cropController = require('../controllers/cropController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', cropController.getAllCropPrices);
router.get('/:id', cropController.getCropPriceById);
router.get('/trends/prices', cropController.getPriceTrends);

// Admin routes
router.post('/', authMiddleware, cropController.addCropPrice);
router.put('/:id', authMiddleware, cropController.updateCropPrice);

module.exports = router;
