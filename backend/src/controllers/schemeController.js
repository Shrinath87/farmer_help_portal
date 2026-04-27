const Scheme = require('../models/Scheme');

// Get all schemes
const getAllSchemes = async (req, res) => {
  try {
    const { state, category, status } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;
    if (state) filter.state = state;

    const schemes = await Scheme.find(filter).sort({ createdAt: -1 });
    res.json(schemes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch schemes' });
  }
};

// Get scheme by ID
const getSchemeById = async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    if (!scheme) {
      return res.status(404).json({ error: 'Scheme not found' });
    }
    res.json(scheme);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch scheme' });
  }
};

// Add scheme (Admin only)
const addScheme = async (req, res) => {
  try {
    const { schemeName, description, ministry, eligibility, benefits, subsidyPercentage, applicationLink, documentRequired, state, category } = req.body;

    if (!schemeName || !description || !category) {
      return res.status(400).json({ error: 'Please provide required fields' });
    }

    const scheme = new Scheme({
      schemeName,
      description,
      ministry,
      eligibility,
      benefits,
      subsidyPercentage,
      applicationLink,
      documentRequired,
      state,
      category,
    });

    await scheme.save();
    res.status(201).json({ message: 'Scheme added successfully', scheme });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add scheme' });
  }
};

// Update scheme
const updateScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!scheme) {
      return res.status(404).json({ error: 'Scheme not found' });
    }

    res.json({ message: 'Scheme updated successfully', scheme });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update scheme' });
  }
};

// Delete scheme
const deleteScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findByIdAndDelete(req.params.id);
    if (!scheme) {
      return res.status(404).json({ error: 'Scheme not found' });
    }
    res.json({ message: 'Scheme deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete scheme' });
  }
};

module.exports = {
  getAllSchemes,
  getSchemeById,
  addScheme,
  updateScheme,
  deleteScheme,
};
