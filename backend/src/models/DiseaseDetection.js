const mongoose = require('mongoose');

const diseaseDetectionSchema = new mongoose.Schema({
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer',
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  cropType: {
    type: String,
    required: true,
  },
  detectedDisease: {
    diseaseName: String,
    confidenceScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    symptoms: [String],
    treatment: String,
    preventionTips: [String],
    severity: {
      type: String,
      enum: ['mild', 'moderate', 'severe'],
    },
  },
  remarks: String,
  status: {
    type: String,
    enum: ['pending', 'analyzed', 'verified'],
    default: 'pending',
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('DiseaseDetection', diseaseDetectionSchema);
