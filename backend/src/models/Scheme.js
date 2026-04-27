const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  schemeName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ministry: String,
  eligibility: [String], // Array of eligibility criteria
  benefits: [String], // Array of benefits
  subsidyPercentage: Number,
  applicationDeadline: Date,
  applicationLink: String,
  documentRequired: [String],
  fundingAmount: String,
  targetBeneficiary: String,
  state: [String],
  category: {
    type: String,
    enum: ['subsidy', 'loan', 'training', 'equipment', 'research', 'other'],
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
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

module.exports = mongoose.model('Scheme', schemeSchema);
