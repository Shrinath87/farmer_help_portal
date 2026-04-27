import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'react-toastify';
import { cropAPI } from '../services/api';

const CropPrices = () => {
  const [selectedCrop, setSelectedCrop] = useState('rice');
  const [selectedState, setSelectedState] = useState('Karnataka');
  const [prices, setPrices] = useState([]);
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(false);

  const crops = ['rice', 'wheat', 'sugarcane', 'maize', 'cotton', 'soybean', 'groundnut', 'sunflower'];
  const states = ['Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Telangana', 'Maharashtra', 'Punjab', 'Haryana', 'Uttar Pradesh'];

  useEffect(() => {
    fetchPrices();
  }, [selectedCrop, selectedState]);

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const response = await cropAPI.getAllPrices({
        cropName: selectedCrop,
        state: selectedState,
      });
      setPrices(response.data);

      // Fetch trends
      const trendsResponse = await cropAPI.getPriceTrends({
        cropName: selectedCrop,
        state: selectedState,
      });
      setTrends(trendsResponse.data);
    } catch (error) {
      toast.error('Failed to fetch crop prices');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="section-title">Crop Market Prices</h1>
          <p className="section-subtitle">
            Real-time market prices of agricultural commodities
          </p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="label-field">Select Crop</label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="input-field capitalize"
            >
              {crops.map(crop => (
                <option key={crop} value={crop}>{crop.toUpperCase()}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-field">Select State</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="input-field"
            >
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-secondary-green"></div>
            <p className="mt-4 text-gray-600">Loading prices...</p>
          </div>
        ) : (
          <>
            {/* Price Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {prices.length > 0 && prices.map((price, index) => (
                <div key={index} className="card">
                  <p className="text-sm text-gray-600 mb-2">{price.market}</p>
                  <div className="mb-4">
                    <p className="text-2xl font-bold text-secondary-green">
                      ₹{price.avgPrice}
                    </p>
                    <p className="text-xs text-gray-500">{price.priceUnit}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Min</p>
                      <p className="font-semibold text-primary-green">₹{price.minPrice}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Max</p>
                      <p className="font-semibold text-primary-green">₹{price.maxPrice}</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      price.trend === 'up' ? 'bg-red-100 text-red-700' :
                      price.trend === 'down' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {price.trend === 'up' ? '📈 Up' : price.trend === 'down' ? '📉 Down' : '➡️ Stable'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Trend Chart */}
            {trends.length > 0 && (
              <div className="card mb-8">
                <h2 className="text-2xl font-bold text-primary-green mb-6">
                  Price Trend (Last 30 Days)
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="price" stroke="#6BA52F" name="Average Price" />
                    <Line type="monotone" dataKey="min" stroke="#A4D65E" name="Min Price" />
                    <Line type="monotone" dataKey="max" stroke="#FF9500" name="Max Price" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Price Comparison */}
            {trends.length > 0 && (
              <div className="card">
                <h2 className="text-2xl font-bold text-primary-green mb-6">
                  Price Comparison Chart
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={trends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="max" fill="#FF9500" name="Max Price" />
                    <Bar dataKey="price" fill="#6BA52F" name="Avg Price" />
                    <Bar dataKey="min" fill="#A4D65E" name="Min Price" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CropPrices;
