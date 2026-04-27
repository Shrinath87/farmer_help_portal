import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiSearch, FiFilter, FiExternalLink } from 'react-icons/fi';
import { schemeAPI } from '../services/api';

const Schemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const categories = ['subsidy', 'loan', 'training', 'equipment', 'research', 'other'];
  const states = ['Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Telangana', 'Maharashtra', 'Punjab', 'Haryana', 'Uttar Pradesh'];

  useEffect(() => {
    fetchSchemes();
  }, []);

  useEffect(() => {
    filterSchemes();
  }, [schemes, searchTerm, selectedCategory, selectedState]);

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      const response = await schemeAPI.getAllSchemes({ status: 'active' });
      setSchemes(response.data);
    } catch (error) {
      toast.error('Failed to fetch schemes');
    } finally {
      setLoading(false);
    }
  };

  const filterSchemes = () => {
    let filtered = schemes;

    if (searchTerm) {
      filtered = filtered.filter(scheme =>
        scheme.schemeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(scheme => scheme.category === selectedCategory);
    }

    if (selectedState) {
      filtered = filtered.filter(scheme => scheme.state?.includes(selectedState));
    }

    setFilteredSchemes(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="section-title">Government Schemes for Farmers</h1>
          <p className="section-subtitle">
            Discover latest government schemes, subsidies, and benefits
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search schemes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                ))}
              </select>
            </div>

            {/* State Filter */}
            <div>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="input-field"
              >
                <option value="">All States</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found <span className="font-bold text-secondary-green">{filteredSchemes.length}</span> schemes
          </p>
        </div>

        {/* Schemes List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-secondary-green"></div>
            <p className="mt-4 text-gray-600">Loading schemes...</p>
          </div>
        ) : filteredSchemes.length > 0 ? (
          <div className="space-y-6">
            {filteredSchemes.map((scheme) => (
              <div key={scheme._id} className="card hover:shadow-xl transition">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-primary-green mb-2">
                      {scheme.schemeName}
                    </h3>
                    {scheme.ministry && (
                      <p className="text-sm text-gray-600 mb-2">
                        Ministry: {scheme.ministry}
                      </p>
                    )}
                  </div>
                  <span className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap ${
                    scheme.category === 'subsidy' ? 'bg-green-100 text-green-700' :
                    scheme.category === 'loan' ? 'bg-blue-100 text-blue-700' :
                    scheme.category === 'training' ? 'bg-purple-100 text-purple-700' :
                    scheme.category === 'equipment' ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {scheme.category.charAt(0).toUpperCase() + scheme.category.slice(1)}
                  </span>
                </div>

                <p className="text-gray-700 mb-4">{scheme.description}</p>

                {/* Benefits and Eligibility */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {scheme.benefits && scheme.benefits.length > 0 && (
                    <div>
                      <p className="font-semibold text-primary-green mb-2">✓ Benefits</p>
                      <ul className="space-y-1">
                        {scheme.benefits.slice(0, 3).map((benefit, i) => (
                          <li key={i} className="text-sm text-gray-700">• {benefit}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {scheme.eligibility && scheme.eligibility.length > 0 && (
                    <div>
                      <p className="font-semibold text-primary-green mb-2">📋 Eligibility</p>
                      <ul className="space-y-1">
                        {scheme.eligibility.slice(0, 3).map((crit, i) => (
                          <li key={i} className="text-sm text-gray-700">• {crit}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  {scheme.fundingAmount && (
                    <div>
                      <p className="text-xs text-gray-600">Funding</p>
                      <p className="font-semibold text-primary-green">{scheme.fundingAmount}</p>
                    </div>
                  )}
                  {scheme.subsidyPercentage && (
                    <div>
                      <p className="text-xs text-gray-600">Subsidy</p>
                      <p className="font-semibold text-secondary-green">{scheme.subsidyPercentage}%</p>
                    </div>
                  )}
                  {scheme.state && (
                    <div>
                      <p className="text-xs text-gray-600">States</p>
                      <p className="font-semibold text-primary-green">{scheme.state.length} states</p>
                    </div>
                  )}
                  {scheme.applicationDeadline && (
                    <div>
                      <p className="text-xs text-gray-600">Deadline</p>
                      <p className="font-semibold text-primary-green">
                        {new Date(scheme.applicationDeadline).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {scheme.applicationLink && (
                    <a
                      href={scheme.applicationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 btn-primary"
                    >
                      Apply Now
                      <FiExternalLink size={16} />
                    </a>
                  )}
                  <button className="btn-outline">
                    Save for Later
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <p className="text-gray-600 text-lg">No schemes found matching your criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setSelectedState('');
              }}
              className="btn-secondary mt-4"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schemes;
