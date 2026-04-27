const mongoose = require('mongoose');

const cropPriceSchema = new mongoose.Schema({
  cropName: {
    type: String,
    required: true,
    enum: ['rice', 'wheat', 'sugarcane', 'maize', 'cotton', 'soybean', 'groundnut', 'sunflower'],
  },
  market: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  minPrice: {
    type: Number,
    required: true,
  },
  maxPrice: {
    type: Number,
    required: true,
  },
  avgPrice: {
    type: Number,
    required: true,
  },
  priceUnit: {
    type: String,
    default: 'Rs per Quintal',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  trend: {
    type: String,
    enum: ['up', 'down', 'stable'],
  },
  priceHistory: [{
    date: Date,
    price: Number,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('CropPrice', cropPriceSchema);
