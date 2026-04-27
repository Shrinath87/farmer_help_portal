import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI, diseaseAPI } from '../services/api';
import { FiLogOut, FiEdit2, FiTrendingUp, FiCloud, FiGitlab } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(user);
  const [diseaseHistory, setDiseaseHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchDiseaseHistory();
  }, [user, navigate]);

  const fetchDiseaseHistory = async () => {
    try {
      const response = await diseaseAPI.getHistory();
      setDiseaseHistory(response.data.slice(0, 5));
    } catch (error) {
      console.error('Failed to fetch disease history');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="card bg-gradient-to-r from-primary-green to-secondary-green text-white mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {profile?.name}!</h1>
              <p className="text-light-green">Your personalized farming dashboard</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-accent-orange rounded-lg hover:bg-yellow-600 transition"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-4xl mb-2">🌾</div>
            <p className="text-gray-600 text-sm">Registered Crops</p>
            <p className="text-2xl font-bold text-secondary-green">
              {profile?.crops?.length || 0}
            </p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-2">🔬</div>
            <p className="text-gray-600 text-sm">Disease Tests</p>
            <p className="text-2xl font-bold text-secondary-green">
              {diseaseHistory.length}
            </p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-2">📈</div>
            <p className="text-gray-600 text-sm">Price Watchlist</p>
            <p className="text-2xl font-bold text-secondary-green">
              {profile?.priceWatchlist?.length || 0}
            </p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-2">💰</div>
            <p className="text-gray-600 text-sm">Farm Size</p>
            <p className="text-2xl font-bold text-secondary-green">
              {profile?.farmSize || '-'} acres
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="card">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-bold text-primary-green">Profile Info</h2>
              <button className="text-secondary-green hover:text-primary-green">
                <FiEdit2 size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold text-primary-green">{profile?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-primary-green text-sm">{profile?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold text-primary-green">{profile?.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-semibold text-primary-green">
                  {profile?.location?.state}, {profile?.location?.district}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Soil Type</p>
                <p className="font-semibold text-primary-green capitalize">
                  {profile?.soilType || 'Not specified'}
                </p>
              </div>
            </div>
            <button className="w-full btn-secondary mt-6">
              Edit Profile
            </button>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="card">
              <h2 className="text-xl font-bold text-primary-green mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <a href="/crop-prices" className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition">
                  <div className="text-2xl mb-2">📊</div>
                  <p className="font-semibold text-primary-green">Check Prices</p>
                </a>
                <a href="/weather" className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition">
                  <div className="text-2xl mb-2 ">🌤️</div>
                  <p className="font-semibold text-primary-green">Weather</p>
                </a>
                <a href="/fertilizer" className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition">
                  <div className="text-2xl mb-2">🌱</div>
                  <p className="font-semibold text-primary-green">Fertilizer</p>
                </a>
                <a href="/disease-detection" className="p-4 bg-yellow-50 rounded-lg text-center hover:bg-yellow-100 transition">
                  <div className="text-2xl mb-2">🔬</div>
                  <p className="font-semibold text-primary-green">Disease Check</p>
                </a>
              </div>
            </div>

            {/* Recent Disease Tests */}
            {diseaseHistory.length > 0 && (
              <div className="card">
                <h2 className="text-xl font-bold text-primary-green mb-4">Recent Disease Tests</h2>
                <div className="space-y-3">
                  {diseaseHistory.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-primary-green">
                          {item.detectedDisease.diseaseName}
                        </p>
                        <p className="text-xs text-gray-600">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-secondary-green">
                        {item.detectedDisease.confidenceScore}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
