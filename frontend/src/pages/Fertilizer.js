import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FiDroplet, FiTrendingUp } from 'react-icons/fi';
import { GiSolidLeaf } from 'react-icons/gi';
import { fertilizerAPI } from '../services/api';

const Fertilizer = () => {
  const [formData, setFormData] = useState({
    cropType: 'rice',
    soilType: 'loamy',
    growthStage: 'vegetative',
  });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fertilizerAPI.getRecommendations(formData);
      setRecommendations(response.data.recommendations || []);
      if (response.data.recommendations?.length === 0) {
        toast.info('No specific recommendations found. Check general guidelines.');
      } else {
        toast.success('Recommendations generated successfully!');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to get recommendations');
    } finally {
      setLoading(false);
    }
  };

  const cropTypes = ['rice', 'wheat', 'sugarcane', 'maize', 'cotton', 'soybean', 'groundnut', 'sunflower'];
  const soilTypes = ['clay', 'sandy', 'loamy', 'calcareous', 'acidic'];
  const growthStages = ['vegetative', 'flowering', 'fruiting', 'maturity'];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="section-title">AI Fertilizer Recommendation System</h1>
          <p className="section-subtitle">
            Get personalized fertilizer suggestions based on your crops and soil conditions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h2 className="text-xl font-bold text-primary-green mb-6">Enter Details</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="label-field">Crop Type *</label>
                  <select
                    name="cropType"
                    value={formData.cropType}
                    onChange={handleChange}
                    className="input-field capitalize"
                  >
                    {cropTypes.map(crop => (
                      <option key={crop} value={crop}>{crop.toUpperCase()}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label-field">Soil Type *</label>
                  <select
                    name="soilType"
                    value={formData.soilType}
                    onChange={handleChange}
                    className="input-field capitalize"
                  >
                    {soilTypes.map(soil => (
                      <option key={soil} value={soil}>{soil.charAt(0).toUpperCase() + soil.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label-field">Growth Stage *</label>
                  <select
                    name="growthStage"
                    value={formData.growthStage}
                    onChange={handleChange}
                    className="input-field capitalize"
                  >
                    {growthStages.map(stage => (
                      <option key={stage} value={stage}>{stage.charAt(0).toUpperCase() + stage.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Get Recommendations'}
                </button>
              </form>
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="lg:col-span-2">
            {recommendations.length > 0 ? (
              <div className="space-y-6">
                {recommendations.map((fertilizer, idx) => (
                  <div key={idx} className="card">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-primary-green">
                          {fertilizer.fertilizerName}
                        </h3>
                        <p className="text-sm text-gray-600 capitalize">
                          Type: {fertilizer.type}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-secondary-green text-white rounded-full text-xs font-semibold">
                        ⭐ Recommended
                      </span>
                    </div>

                    <p className="text-gray-700 mb-4">{fertilizer.description}</p>

                    {/* NPK Composition */}
                    <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-light-green bg-opacity-10 rounded-lg">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Nitrogen</p>
                        <p className="text-xl font-bold text-primary-green">
                          {fertilizer.nitrogenContent || 'N/A'}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Phosphorus</p>
                        <p className="text-xl font-bold text-primary-green">
                          {fertilizer.phosphorusContent || 'N/A'}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Potassium</p>
                        <p className="text-xl font-bold text-primary-green">
                          {fertilizer.potassiumContent || 'N/A'}%
                        </p>
                      </div>
                    </div>

                    {/* Application Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <FiDroplet className="text-secondary-green" />
                          <p className="font-semibold text-primary-green">Application Rate</p>
                        </div>
                        <p className="text-gray-700">{fertilizer.applicationRate}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <FiTrendingUp className="text-secondary-green" />
                          <p className="font-semibold text-primary-green">Price</p>
                        </div>
                        <p className="text-gray-700">₹{fertilizer.price}/kg</p>
                      </div>
                    </div>

                    {/* Benefits */}
                    {fertilizer.benefits && fertilizer.benefits.length > 0 && (
                      <div className="mb-6">
                        <p className="font-semibold text-primary-green mb-2">✓ Benefits</p>
                        <ul className="space-y-1">
                          {fertilizer.benefits.map((benefit, i) => (
                            <li key={i} className="text-sm text-gray-700">• {benefit}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Precautions */}
                    {fertilizer.precautions && fertilizer.precautions.length > 0 && (
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <p className="font-semibold text-primary-green mb-2">⚠️ Precautions</p>
                        <ul className="space-y-1">
                          {fertilizer.precautions.map((precaution, i) => (
                            <li key={i} className="text-sm text-gray-700">• {precaution}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="card text-center py-12">
                <GiSolidLeaf className="text-6xl text-light-green mx-auto mb-4 opacity-50" />
                <p className="text-gray-600 text-lg">
                  Enter crop details and click "Get Recommendations" to see fertilizer suggestions
                </p>
              </div>
            )}
          </div>
        </div>

        {/* General Guidelines */}
        <div className="mt-12">
          <div className="card">
            <h2 className="text-2xl font-bold text-primary-green mb-6">📚 Fertilizer Guidelines</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-primary-green mb-2">✓ Organic Fertilizers</h3>
                <p className="text-sm text-gray-700">
                  Cow dung, compost, and vermicompost improve soil fertility and organic matter content.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-bold text-primary-green mb-2">✓ Inorganic Fertilizers</h3>
                <p className="text-sm text-gray-700">
                  Urea, DAP, and potash provide quick nutrient availability but should be used carefully.
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-bold text-primary-green mb-2">✓ Bio-Fertilizers</h3>
                <p className="text-sm text-gray-700">
                  Rhizobium, azotobacter, and PSB bacteria enhance nutrient availability naturally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fertilizer;
