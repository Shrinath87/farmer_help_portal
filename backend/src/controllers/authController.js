const Farmer = require('../models/Farmer');
const { generateToken } = require('../utils/tokenUtils');

// Register
const register = async (req, res) => {
  try {
    const { name, email, password, phone, state, district, village } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    let farmer = await Farmer.findOne({ email });
    if (farmer) {
      return res.status(400).json({ error: 'Farmer already exists' });
    }

    farmer = new Farmer({
      name,
      email,
      password,
      phone,
      location: {
        state,
        district,
        village,
      },
    });

    await farmer.save();

    const token = generateToken(farmer._id, farmer.userType);

    res.status(201).json({
      message: 'Farmer registered successfully',
      token,
      farmer: {
        id: farmer._id,
        name: farmer.name,
        email: farmer.email,
        userType: farmer.userType,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    const farmer = await Farmer.findOne({ email });
    if (!farmer) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await farmer.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(farmer._id, farmer.userType);

    res.json({
      message: 'Login successful',
      token,
      farmer: {
        id: farmer._id,
        name: farmer.name,
        email: farmer.email,
        userType: farmer.userType,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during login' });
  }
};

// Get Profile
const getProfile = async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.user.id).select('-password');
    if (!farmer) {
      return res.status(404).json({ error: 'Farmer not found' });
    }
    res.json(farmer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  try {
    const { name, phone, crops, soilType, farmSize } = req.body;

    const farmer = await Farmer.findByIdAndUpdate(
      req.user.id,
      {
        name,
        phone,
        crops,
        soilType,
        farmSize,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    res.json({
      message: 'Profile updated successfully',
      farmer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
};
