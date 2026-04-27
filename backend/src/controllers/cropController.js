const CropPrice = require('../models/CropPrice');

// Get all crop prices
const getAllCropPrices = async (req, res) => {
  try {
    const { cropName, state } = req.query;
    let filter = {};

    if (cropName) filter.cropName = cropName;
    if (state) filter.state = state;

    const prices = await CropPrice.find(filter).sort({ date: -1 });
    res.json(prices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch crop prices' });
  }
};

// Get crop price by ID
const getCropPriceById = async (req, res) => {
  try {
    const price = await CropPrice.findById(req.params.id);
    if (!price) {
      return res.status(404).json({ error: 'Crop price not found' });
    }
    res.json(price);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch crop price' });
  }
};

// Add crop price (Admin only)
const addCropPrice = async (req, res) => {
  try {
    const { cropName, market, state, minPrice, maxPrice, avgPrice, trend } = req.body;

    if (!cropName || !market || !state || !minPrice || !maxPrice || !avgPrice) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const cropPrice = new CropPrice({
      cropName,
      market,
      state,
      minPrice,
      maxPrice,
      avgPrice,
      trend,
      priceHistory: [{
        date: new Date(),
        price: avgPrice,
      }],
    });

    await cropPrice.save();
    res.status(201).json({ message: 'Crop price added successfully', cropPrice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add crop price' });
  }
};

// Update crop price
const updateCropPrice = async (req, res) => {
  try {
    const { minPrice, maxPrice, avgPrice, trend } = req.body;

    const cropPrice = await CropPrice.findById(req.params.id);
    if (!cropPrice) {
      return res.status(404).json({ error: 'Crop price not found' });
    }

    cropPrice.minPrice = minPrice || cropPrice.minPrice;
    cropPrice.maxPrice = maxPrice || cropPrice.maxPrice;
    cropPrice.avgPrice = avgPrice || cropPrice.avgPrice;
    cropPrice.trend = trend || cropPrice.trend;
    cropPrice.priceHistory.push({
      date: new Date(),
      price: avgPrice || cropPrice.avgPrice,
    });

    await cropPrice.save();
    res.json({ message: 'Crop price updated successfully', cropPrice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update crop price' });
  }
};

// Get price trends for a crop
const getPriceTrends = async (req, res) => {
  try {
    const { cropName, state } = req.query;
    
    const prices = await CropPrice.find({ cropName, state }).sort({ date: 1 }).limit(30);
    
    const trends = prices.map(p => ({
      date: p.date,
      price: p.avgPrice,
      min: p.minPrice,
      max: p.maxPrice,
    }));

    res.json(trends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch price trends' });
  }
};

module.exports = {
  getAllCropPrices,
  getCropPriceById,
  addCropPrice,
  updateCropPrice,
  getPriceTrends,
};
