const Fertilizer = require('../models/Fertilizer');

// Get fertilizer recommendations
const getFertilizerRecommendations = async (req, res) => {
  try {
    const { cropType, soilType, growthStage } = req.body;

    if (!cropType || !soilType || !growthStage) {
      return res.status(400).json({ error: 'Please provide crop type, soil type, and growth stage' });
    }

    const recommendations = await Fertilizer.find({
      compatibility: cropType,
      soilType: soilType,
      growthStage: growthStage,
    });

    if (recommendations.length === 0) {
      return res.status(404).json({ message: 'No specific recommendations found', suggestions: [] });
    }

    res.json({
      message: 'Fertilizer recommendations found',
      recommendations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
};

// Get all fertilizers
const getAllFertilizers = async (req, res) => {
  try {
    const { type, compatibility } = req.query;
    let filter = {};

    if (type) filter.type = type;
    if (compatibility) filter.compatibility = compatibility;

    const fertilizers = await Fertilizer.find(filter);
    res.json(fertilizers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch fertilizers' });
  }
};

// Add fertilizer (Admin only)
const addFertilizer = async (req, res) => {
  try {
    const { fertilizerName, type, nitrogenContent, phosphorusContent, potassiumContent, ...rest } = req.body;

    if (!fertilizerName || !type) {
      return res.status(400).json({ error: 'Please provide fertilizer name and type' });
    }

    const fertilizer = new Fertilizer({
      fertilizerName,
      type,
      nitrogenContent,
      phosphorusContent,
      potassiumContent,
      ...rest,
    });

    await fertilizer.save();
    res.status(201).json({ message: 'Fertilizer added successfully', fertilizer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add fertilizer' });
  }
};

// Update fertilizer
const updateFertilizer = async (req, res) => {
  try {
    const fertilizer = await Fertilizer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!fertilizer) {
      return res.status(404).json({ error: 'Fertilizer not found' });
    }

    res.json({ message: 'Fertilizer updated successfully', fertilizer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update fertilizer' });
  }
};

// Delete fertilizer
const deleteFertilizer = async (req, res) => {
  try {
    const fertilizer = await Fertilizer.findByIdAndDelete(req.params.id);
    if (!fertilizer) {
      return res.status(404).json({ error: 'Fertilizer not found' });
    }
    res.json({ message: 'Fertilizer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete fertilizer' });
  }
};

module.exports = {
  getFertilizerRecommendations,
  getAllFertilizers,
  addFertilizer,
  updateFertilizer,
  deleteFertilizer,
};
