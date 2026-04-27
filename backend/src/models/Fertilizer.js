const mongoose = require('mongoose');

const fertilizerSchema = new mongoose.Schema({
  fertilizerName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['organic', 'inorganic', 'bio-fertilizer', 'mixed'],
    required: true,
  },
  nitrogenContent: Number,
  phosphorusContent: Number,
  potassiumContent: Number,
  description: String,
  price: Number,
  unit: {
    type: String,
    default: 'Rs per kg',
  },
  compatibility: [String], // Crops it's compatible with
  soilType: [String], // Types of soil it works with
  growthStage: [String], // Growth stages it can be used at
  applicationRate: String, // How much to apply
  precautions: [String],
  benefits: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Fertilizer', fertilizerSchema);
