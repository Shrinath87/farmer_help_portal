import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiTrendingUp, FiGitlab, FiSettings } from 'react-icons/fi';

const AdminPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Check if user is admin
  if (!user || user.userType !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="card text-center max-w-md">
          <p className="text-4xl mb-4">🔒</p>
          <p className="text-xl font-bold text-primary-green mb-2">Access Denied</p>
          <p className="text-gray-600 mb-6">
            Only administrators can access this panel.
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="card bg-gradient-to-r from-primary-green to-secondary-green text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-light-green">Manage Farmer Help Portal</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <FiUsers className="text-4xl text-secondary-green mx-auto mb-2" />
            <p className="text-gray-600 text-sm">Total Farmers</p>
            <p className="text-2xl font-bold text-primary-green">1,234</p>
          </div>
          <div className="card text-center">
            <FiTrendingUp className="text-4xl text-secondary-green mx-auto mb-2" />
            <p className="text-gray-600 text-sm">Active Prices</p>
            <p className="text-2xl font-bold text-primary-green">450</p>
          </div>
          <div className="card text-center">
            <FiGitlab className="text-4xl text-secondary-green mx-auto mb-2" />
            <p className="text-gray-600 text-sm">Schemes</p>
            <p className="text-2xl font-bold text-primary-green">89</p>
          </div>
          <div className="card text-center">
            <FiSettings className="text-4xl text-secondary-green mx-auto mb-2" />
            <p className="text-gray-600 text-sm">Disease Cases</p>
            <p className="text-2xl font-bold text-primary-green">567</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="card">
          <div className="border-b border-gray-200 mb-6">
            <div className="flex gap-4">
              {['overview', 'crops', 'schemes', 'disease', 'users'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-semibold transition ${
                    activeTab === tab
                      ? 'text-secondary-green border-b-2 border-secondary-green'
                      : 'text-gray-600 hover:text-primary-green'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <p className="text-gray-700 font-semibold mb-4">Dashboard Overview</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="font-semibold text-primary-green">Recent Registrations</p>
                    <p className="text-2xl font-bold text-secondary-green mt-2">45</p>
                    <p className="text-xs text-gray-600 mt-1">This month</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="font-semibold text-primary-green">Active Users</p>
                    <p className="text-2xl font-bold text-secondary-green mt-2">892</p>
                    <p className="text-xs text-gray-600 mt-1">Last 30 days</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'crops' && (
              <div>
                <p className="text-gray-700 font-semibold mb-4">Manage Crop Prices</p>
                <button className="btn-secondary">Add New Crop Price</button>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">Crop</th>
                        <th className="px-4 py-2 text-left">Market</th>
                        <th className="px-4 py-2 text-left">Price</th>
                        <th className="px-4 py-2 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t hover:bg-gray-50">
                        <td className="px-4 py-2">Rice</td>
                        <td className="px-4 py-2">Bengaluru</td>
                        <td className="px-4 py-2">₹4,500</td>
                        <td className="px-4 py-2">
                          <button className="text-secondary-green hover:underline">Edit</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'schemes' && (
              <div>
                <p className="text-gray-700 font-semibold mb-4">Manage Government Schemes</p>
                <button className="btn-secondary">Add New Scheme</button>
              </div>
            )}

            {activeTab === 'disease' && (
              <div>
                <p className="text-gray-700 font-semibold mb-4">Disease Detection Records</p>
                <p className="text-gray-600">View and verify farmer reports</p>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <p className="text-gray-700 font-semibold mb-4">User Management</p>
                <p className="text-gray-600">Manage farmer accounts and permissions</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
