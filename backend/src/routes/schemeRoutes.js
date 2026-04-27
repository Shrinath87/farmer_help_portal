const express = require('express');
const router = express.Router();
const schemeController = require('../controllers/schemeController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', schemeController.getAllSchemes);
router.get('/:id', schemeController.getSchemeById);

// Admin routes
router.post('/', authMiddleware, schemeController.addScheme);
router.put('/:id', authMiddleware, schemeController.updateScheme);
router.delete('/:id', authMiddleware, schemeController.deleteScheme);

module.exports = router;
