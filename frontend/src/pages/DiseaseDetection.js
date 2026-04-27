import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiUpload, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { diseaseAPI } from '../services/api';

const DiseaseDetection = () => {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [cropType, setCropType] = useState('rice');
  const [loading, setLoading] = useState(false);
  const [detection, setDetection] = useState(null);
  const [history, setHistory] = useState([]);

  const cropTypes = ['rice', 'wheat', 'sugarcane', 'maize', 'cotton', 'soybean', 'groundnut', 'sunflower'];

  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user]);

  const fetchHistory = async () => {
    try {
      const response = await diseaseAPI.getHistory();
      setHistory(response.data);
    } catch (error) {
      console.error('Failed to fetch history');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error('Please select an image');
      return;
    }

    if (!user) {
      toast.error('Please login to use this feature');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('cropType', cropType);

    try {
      const response = await diseaseAPI.uploadImage(formData);
      setDetection(response.data.detection);
      toast.success('Image analyzed successfully!');
      setSelectedFile(null);
      setPreview(null);
      fetchHistory();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to analyze image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="section-title">AI Plant Disease Detection</h1>
          <p className="section-subtitle">
            Upload a crop/leaf image to identify diseases and get treatment recommendations
          </p>
        </div>

        {!user && (
          <div className="card bg-yellow-50 border-2 border-yellow-200 mb-8">
            <p className="text-yellow-800">
              📝 Please <a href="/login" className="font-bold underline">login</a> or <a href="/register" className="font-bold underline">register</a> to analyze disease images
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h2 className="text-xl font-bold text-primary-green mb-6">Upload Image</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Crop Type */}
                <div>
                  <label className="label-field">Select Crop Type</label>
                  <select
                    value={cropType}
                    onChange={(e) => setCropType(e.target.value)}
                    className="input-field capitalize"
                  >
                    {cropTypes.map(crop => (
                      <option key={crop} value={crop}>{crop.toUpperCase()}</option>
                    ))}
                  </select>
                </div>

                {/* File Upload */}
                <div>
                  <label className="label-field">Upload Image</label>
                  <div className="border-2 border-dashed border-secondary-green rounded-lg p-6 text-center hover:bg-light-green hover:bg-opacity-10 transition cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-input"
                      disabled={!user}
                    />
                    <label htmlFor="file-input" className="cursor-pointer">
                      <FiUpload className="text-4xl text-secondary-green mx-auto mb-2" />
                      <p className="font-semibold text-primary-green mb-1">
                        {selectedFile ? selectedFile.name : 'Click to upload'}
                      </p>
                      <p className="text-sm text-gray-600">PNG, JPG up to 5MB</p>
                    </label>
                  </div>
                </div>

                {/* Preview */}
                {preview && (
                  <div>
                    <p className="label-field">Preview</p>
                    <img src={preview} alt="Preview" className="w-full rounded-lg" />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !user}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Analyzing...' : 'Analyze Image'}
                </button>
              </form>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {detection ? (
              <div className="card">
                <div className="flex items-center gap-3 mb-6">
                  <FiCheck className="text-3xl text-green-600" />
                  <h2 className="text-2xl font-bold text-primary-green">Analysis Results</h2>
                </div>

                {/* Disease Information */}
                <div className="bg-gradient-to-br from-secondary-green to-light-green text-white rounded-lg p-6 mb-6">
                  <h3 className="text-2xl font-bold mb-4">{detection.detectedDisease.diseaseName}</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm opacity-90">Confidence</p>
                      <p className="text-2xl font-bold">{detection.detectedDisease.confidenceScore}%</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-90">Severity</p>
                      <p className="text-2xl font-bold capitalize">{detection.detectedDisease.severity}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-90">Status</p>
                      <p className="text-2xl font-bold capitalize">{detection.status}</p>
                    </div>
                  </div>
                </div>

                {/* Symptoms */}
                {detection.detectedDisease.symptoms && detection.detectedDisease.symptoms.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-bold text-primary-green mb-3 flex items-center gap-2">
                      <FiAlertCircle /> Symptoms
                    </h3>
                    <ul className="space-y-2">
                      {detection.detectedDisease.symptoms.map((symptom, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-700">
                          <span className="w-2 h-2 bg-secondary-green rounded-full"></span>
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Treatment */}
                {detection.detectedDisease.treatment && (
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h3 className="font-bold text-primary-green mb-2">💊 Treatment</h3>
                    <p className="text-gray-700">{detection.detectedDisease.treatment}</p>
                  </div>
                )}

                {/* Prevention */}
                {detection.detectedDisease.preventionTips && detection.detectedDisease.preventionTips.length > 0 && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-bold text-primary-green mb-3">🛡️ Prevention Tips</h3>
                    <ul className="space-y-2">
                      {detection.detectedDisease.preventionTips.map((tip, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-700">
                          <span className="text-green-600">✓</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6 p-4 bg-gray-100 rounded-lg text-sm text-gray-600">
                  <p>
                    ℹ️ This AI analysis is for guidance purposes only. Always consult agriculture experts for critical decisions.
                  </p>
                </div>
              </div>
            ) : (
              <div className="card text-center py-12">
                <FiUpload className="text-6xl text-light-green mx-auto mb-4 opacity-50" />
                <p className="text-gray-600 text-lg">
                  Upload a crop image to get disease detection analysis
                </p>
              </div>
            )}

            {/* Recent History */}
            {history.length > 0 && (
              <div className="card mt-8">
                <h3 className="text-xl font-bold text-primary-green mb-4">📋 Recent Analysis</h3>
                <div className="space-y-3">
                  {history.slice(0, 5).map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-primary-green">{item.detectedDisease.diseaseName}</p>
                        <p className="text-xs text-gray-600 capitalize">{item.cropType}</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
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

export default DiseaseDetection;
