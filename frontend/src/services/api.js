import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  getProfile: () => apiClient.get('/auth/profile'),
  updateProfile: (data) => apiClient.put('/auth/profile', data),
};

// Crop Prices API
export const cropAPI = {
  getAllPrices: (params) => apiClient.get('/crops', { params }),
  getPriceById: (id) => apiClient.get(`/crops/${id}`),
  addPrice: (data) => apiClient.post('/crops', data),
  updatePrice: (id, data) => apiClient.put(`/crops/${id}`, data),
  getPriceTrends: (params) => apiClient.get('/crops/trends/prices', { params }),
};

// Weather API
export const weatherAPI = {
  getCurrentWeather: (params) => apiClient.get('/weather/current', { params }),
  getForecast: (params) => apiClient.get('/weather/forecast', { params }),
  getAlerts: () => apiClient.get('/weather/alerts'),
};

// Fertilizer API
export const fertilizerAPI = {
  getRecommendations: (data) => apiClient.post('/fertilizer/recommendations', data),
  getAllFertilizers: (params) => apiClient.get('/fertilizer', { params }),
  addFertilizer: (data) => apiClient.post('/fertilizer', data),
  updateFertilizer: (id, data) => apiClient.put(`/fertilizer/${id}`, data),
  deleteFertilizer: (id) => apiClient.delete(`/fertilizer/${id}`),
};

// Schemes API
export const schemeAPI = {
  getAllSchemes: (params) => apiClient.get('/schemes', { params }),
  getSchemeById: (id) => apiClient.get(`/schemes/${id}`),
  addScheme: (data) => apiClient.post('/schemes', data),
  updateScheme: (id, data) => apiClient.put(`/schemes/${id}`, data),
  deleteScheme: (id) => apiClient.delete(`/schemes/${id}`),
};

// Disease Detection API
export const diseaseAPI = {
  uploadImage: (formData) => apiClient.post('/disease/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getHistory: () => apiClient.get('/disease/history'),
  getDiseaseDetails: (id) => apiClient.get(`/disease/${id}`),
  getAllRecords: () => apiClient.get('/disease/admin/all'),
};

export default apiClient;
