const express = require('express');
const router = express.Router();
const multer = require('multer');
const diseaseController = require('../controllers/diseaseController');
const authMiddleware = require('../middleware/authMiddleware');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Protected routes
router.post('/upload', authMiddleware, upload.single('image'), diseaseController.uploadDiseaseImage);
router.get('/history', authMiddleware, diseaseController.getDiseaseHistory);
router.get('/:id', authMiddleware, diseaseController.getDiseaseDetails);

// Admin routes
router.get('/admin/all', authMiddleware, diseaseController.getAllDiseaseRecords);

module.exports = router;
