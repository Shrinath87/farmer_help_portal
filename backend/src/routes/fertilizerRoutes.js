const express = require('express');
const router = express.Router();
const fertilizerController = require('../controllers/fertilizerController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/recommendations', fertilizerController.getFertilizerRecommendations);
router.get('/', fertilizerController.getAllFertilizers);

// Admin routes
router.post('/', authMiddleware, fertilizerController.addFertilizer);
router.put('/:id', authMiddleware, fertilizerController.updateFertilizer);
router.delete('/:id', authMiddleware, fertilizerController.deleteFertilizer);

module.exports = router;
