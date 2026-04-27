const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Public routes
router.get('/current', weatherController.getCurrentWeather);
router.get('/forecast', weatherController.getWeatherForecast);
router.get('/alerts', weatherController.getWeatherAlerts);

module.exports = router;
