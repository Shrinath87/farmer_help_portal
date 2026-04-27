const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const farmerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  location: {
    state: String,
    district: String,
    village: String,
    latitude: Number,
    longitude: Number,
  },
  crops: [String],
  soilType: String,
  farmSize: Number, // in acres
  userType: {
    type: String,
    enum: ['farmer', 'admin'],
    default: 'farmer',
  },
  profileImage: String,
  savedCrops: [String],
  priceWatchlist: [String],
  diseaseHistory: [mongoose.Schema.Types.ObjectId],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
farmerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
farmerSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Farmer', farmerSchema);
