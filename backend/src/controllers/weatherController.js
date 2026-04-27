// Mock weather data - In production, integrate with OpenWeatherMap or similar API
const MOCK_WEATHER_DATA = {
  current: {
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    rainfall: 0,
    condition: 'Partly Cloudy',
    feelsLike: 26,
  },
  forecast: [
    { day: 'Monday', high: 32, low: 24, condition: 'Sunny', rainfall: 0 },
    { day: 'Tuesday', high: 30, low: 23, condition: 'Partly Cloudy', rainfall: 2 },
    { day: 'Wednesday', high: 28, low: 22, condition: 'Rainy', rainfall: 15 },
    { day: 'Thursday', high: 29, low: 23, condition: 'Partly Cloudy', rainfall: 5 },
    { day: 'Friday', high: 31, low: 24, condition: 'Sunny', rainfall: 0 },
    { day: 'Saturday', high: 33, low: 25, condition: 'Sunny', rainfall: 0 },
    { day: 'Sunday', high: 32, low: 24, condition: 'Partly Cloudy', rainfall: 1 },
  ],
};

// Get current weather
const getCurrentWeather = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Please provide latitude and longitude' });
    }

    // In production, call actual weather API
    // For now, return mock data
    res.json({
      location: { latitude, longitude },
      ...MOCK_WEATHER_DATA.current,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
};

// Get weather forecast
const getWeatherForecast = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Please provide latitude and longitude' });
    }

    // In production, call actual weather API
    res.json({
      location: { latitude, longitude },
      forecast: MOCK_WEATHER_DATA.forecast,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch forecast' });
  }
};

// Get weather alerts
const getWeatherAlerts = async (req, res) => {
  try {
    const alerts = [
      {
        type: 'moderate_rain',
        severity: 'warning',
        message: 'Moderate rainfall expected in next 24 hours',
        recommendation: 'Ensure proper drainage for crops',
      },
      {
        type: 'temperature_high',
        severity: 'caution',
        message: 'High temperature alert - Up to 35°C expected',
        recommendation: 'Increase irrigation frequency',
      },
    ];

    res.json(alerts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
};

module.exports = {
  getCurrentWeather,
  getWeatherForecast,
  getWeatherAlerts,
};
