const DiseaseDetection = require('../models/DiseaseDetection');
const fs = require('fs');
const path = require('path');

// Common plant diseases database (mock AI)
const DISEASE_DATABASE = {
  'leaf_spot': {
    diseaseName: 'Leaf Spot',
    symptoms: ['Brown spots on leaves', 'Yellow halo around spots', 'Premature leaf fall'],
    treatment: 'Apply fungicide spray, Remove infected leaves',
    preventionTips: ['Ensure proper spacing', 'Maintain good ventilation', 'Avoid overhead irrigation'],
  },
  'powdery_mildew': {
    diseaseName: 'Powdery Mildew',
    symptoms: ['White powder-like coating on leaves', 'Curling of leaves', 'Stunted growth'],
    treatment: 'Use sulfur-based fungicides or neem oil',
    preventionTips: ['Reduce humidity', 'Improve air circulation', 'Remove infected parts'],
  },
  'rust': {
    diseaseName: 'Rust',
    symptoms: ['Orange/brown pustules on leaves', 'Yellowing of leaves', 'Leaf defoliation'],
    treatment: 'Apply rust-specific fungicides',
    preventionTips: ['Plant resistant varieties', 'Improve drainage', 'Avoid leaf wetness'],
  },
  'blight': {
    diseaseName: 'Blight',
    symptoms: ['Water-soaked lesions', 'Rapid plant wilting', 'Black spots on stems'],
    treatment: 'Remove infected plants, Apply copper fungicide',
    preventionTips: ['Crop rotation', 'Proper sanitation', 'Avoid overhead watering'],
  },
};

// Simulate AI disease detection (Mock)
const detectDisease = (cropType) => {
  const diseases = Object.keys(DISEASE_DATABASE);
  const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
  const diseaseInfo = DISEASE_DATABASE[randomDisease];
  
  return {
    ...diseaseInfo,
    confidenceScore: Math.floor(Math.random() * 30) + 70, // 70-100%
    severity: ['mild', 'moderate', 'severe'][Math.floor(Math.random() * 3)],
  };
};

// Upload disease image
const uploadDiseaseImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload an image' });
    }

    const { cropType } = req.body;
    if (!cropType) {
      return res.status(400).json({ error: 'Please specify crop type' });
    }

    // Simulate AI detection
    const detectedDisease = detectDisease(cropType);

    const diseaseRecord = new DiseaseDetection({
      farmerId: req.user.id,
      imageUrl: `/uploads/${req.file.filename}`,
      cropType,
      detectedDisease,
      status: 'analyzed',
    });

    await diseaseRecord.save();

    res.status(201).json({
      message: 'Image analyzed successfully',
      detection: diseaseRecord,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to analyze image' });
  }
};

// Get farmer's disease history
const getDiseaseHistory = async (req, res) => {
  try {
    const records = await DiseaseDetection.find({ farmerId: req.user.id }).sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch disease history' });
  }
};

// Get disease details
const getDiseaseDetails = async (req, res) => {
  try {
    const record = await DiseaseDetection.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ error: 'Disease record not found' });
    }
    res.json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch disease details' });
  }
};

// Get all disease records (Admin)
const getAllDiseaseRecords = async (req, res) => {
  try {
    const records = await DiseaseDetection.find()
      .populate('farmerId', 'name email')
      .sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch disease records' });
  }
};

module.exports = {
  uploadDiseaseImage,
  getDiseaseHistory,
  getDiseaseDetails,
  getAllDiseaseRecords,
};
